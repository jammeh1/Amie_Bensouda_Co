import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, Save, Eye, Send, Calendar, Loader2, Trash2, Image as ImageIcon,
  Bold, Italic, List, ListOrdered, Heading2, Link as LinkIcon, CheckCircle2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { renderMarkdown, slugify } from '@/lib/markdown';

const CATEGORIES = ['Investment', 'Banking', 'Energy', 'Tax', 'Corporate', 'Maritime', 'Litigation', 'Real Estate', 'IP', 'Other'];

export interface ArticleRecord {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body_markdown: string;
  cover_image_url: string;
  author_name: string;
  status: 'draft' | 'scheduled' | 'published';
  published_at: string | null;
  read_time: string;
}

const empty: ArticleRecord = {
  title: '',
  slug: '',
  category: 'Investment',
  excerpt: '',
  body_markdown: '',
  cover_image_url: '',
  author_name: '',
  status: 'draft',
  published_at: null,
  read_time: '',
};

interface Props {
  articleId: string | 'new';
  onBack: () => void;
}

const ArticleEditor: React.FC<Props> = ({ articleId, onBack }) => {
  const [article, setArticle] = useState<ArticleRecord>(empty);
  const [originalSlug, setOriginalSlug] = useState('');
  const [loading, setLoading] = useState(articleId !== 'new');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');

  const dirtyRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load existing article
  useEffect(() => {
    if (articleId === 'new') return;
    (async () => {
      const { data, error: e } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .maybeSingle();
      if (e || !data) {
        setError('Could not load article');
      } else {
        setArticle({
          id: data.id,
          title: data.title || '',
          slug: data.slug || '',
          category: data.category || 'Investment',
          excerpt: data.excerpt || '',
          body_markdown: data.body_markdown || '',
          cover_image_url: data.cover_image_url || '',
          author_name: data.author_name || '',
          status: data.status || 'draft',
          published_at: data.published_at,
          read_time: data.read_time || '',
        });
        setOriginalSlug(data.slug || '');
      }
      setLoading(false);
    })();
  }, [articleId]);

  // Auto-slug from title for new articles
  useEffect(() => {
    if (articleId === 'new' && article.title && !article.slug) {
      setArticle((a) => ({ ...a, slug: slugify(a.title) }));
    }
  }, [article.title, articleId, article.slug]);

  const update = <K extends keyof ArticleRecord>(key: K, value: ArticleRecord[K]) => {
    dirtyRef.current = true;
    setArticle((a) => ({ ...a, [key]: value }));
  };

  // Save (manual or auto). Returns the saved article.
  const save = async (overrides?: Partial<ArticleRecord>, silent = false): Promise<ArticleRecord | null> => {
    if (!silent) setSaving(true);
    setError('');
    const payload = {
      title: article.title || 'Untitled draft',
      slug: article.slug || slugify(article.title || `draft-${Date.now()}`),
      category: article.category,
      excerpt: article.excerpt || null,
      body_markdown: article.body_markdown || null,
      cover_image_url: article.cover_image_url || null,
      author_name: article.author_name || null,
      status: article.status,
      published_at: article.published_at,
      read_time: article.read_time || null,
      updated_at: new Date().toISOString(),
      ...overrides,
    };

    let result;
    if (article.id) {
      result = await supabase.from('articles').update(payload).eq('id', article.id).select().maybeSingle();
    } else {
      result = await supabase.from('articles').insert(payload).select().maybeSingle();
    }

    if (result.error) {
      setError(result.error.message);
      if (!silent) setSaving(false);
      return null;
    }
    if (result.data) {
      setArticle({
        id: result.data.id,
        title: result.data.title || '',
        slug: result.data.slug || '',
        category: result.data.category || 'Investment',
        excerpt: result.data.excerpt || '',
        body_markdown: result.data.body_markdown || '',
        cover_image_url: result.data.cover_image_url || '',
        author_name: result.data.author_name || '',
        status: result.data.status,
        published_at: result.data.published_at,
        read_time: result.data.read_time || '',
      });
      setOriginalSlug(result.data.slug);
    }
    setLastSaved(new Date());
    dirtyRef.current = false;
    if (!silent) setSaving(false);
    return result.data as ArticleRecord;
  };

  // Autosave every 8s if dirty and there's content
  useEffect(() => {
    const t = setInterval(() => {
      if (dirtyRef.current && (article.title.trim() || article.body_markdown.trim())) {
        save(undefined, true);
      }
    }, 8000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  const handlePublish = async () => {
    const nowIso = article.published_at || new Date().toISOString();
    const saved = await save({ status: 'published', published_at: nowIso });
    if (saved) {
      setArticle((a) => ({ ...a, status: 'published', published_at: nowIso }));
    }
  };

  const handleUnpublish = async () => {
    await save({ status: 'draft' });
    setArticle((a) => ({ ...a, status: 'draft' }));
  };

  const handleSchedule = async () => {
    if (!scheduleDate) return;
    const iso = new Date(scheduleDate).toISOString();
    await save({ status: 'scheduled', published_at: iso });
    setArticle((a) => ({ ...a, status: 'scheduled', published_at: iso }));
    setScheduleOpen(false);
  };

  const handleDelete = async () => {
    if (!article.id) { onBack(); return; }
    if (!confirm('Delete this article permanently?')) return;
    await supabase.from('articles').delete().eq('id', article.id);
    onBack();
  };

  const insertMarkdown = (before: string, after = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = article.body_markdown.slice(start, end);
    const newText =
      article.body_markdown.slice(0, start) + before + sel + after + article.body_markdown.slice(end);
    update('body_markdown', newText);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + sel.length);
    }, 0);
  };

  const statusBadge = () => {
    const map = {
      draft: 'bg-white/10 text-white/70',
      scheduled: 'bg-amber-500/15 text-amber-400',
      published: 'bg-[#D61F1F]/15 text-[#D61F1F]',
    } as const;
    return (
      <span className={`px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase ${map[article.status]}`}>
        {article.status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-white/40">
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white"
          >
            <ArrowLeft size={14} /> Back
          </button>
          {statusBadge()}
          {saving ? (
            <span className="flex items-center gap-2 text-xs text-white/50">
              <Loader2 size={12} className="animate-spin" /> Saving...
            </span>
          ) : lastSaved ? (
            <span className="flex items-center gap-2 text-xs text-white/40">
              <CheckCircle2 size={12} className="text-[#D61F1F]" /> Saved {lastSaved.toLocaleTimeString()}
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 hover:bg-white/5 text-[11px] tracking-[0.2em] uppercase"
          >
            <Eye size={13} /> {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => save()}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 hover:bg-white/5 text-[11px] tracking-[0.2em] uppercase"
          >
            <Save size={13} /> Save Draft
          </button>
          <button
            onClick={() => setScheduleOpen(!scheduleOpen)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 hover:bg-white/5 text-[11px] tracking-[0.2em] uppercase"
          >
            <Calendar size={13} /> Schedule
          </button>
          {article.status === 'published' ? (
            <button
              onClick={handleUnpublish}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[11px] tracking-[0.2em] uppercase"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D61F1F] hover:bg-[#b51919] text-[11px] tracking-[0.2em] uppercase"
            >
              <Send size={13} /> Publish
            </button>
          )}
          {article.id && (
            <button
              onClick={handleDelete}
              className="p-2.5 border border-white/15 hover:bg-[#D61F1F] hover:border-[#D61F1F]"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      {scheduleOpen && (
        <div className="mb-6 bg-white/5 border border-white/10 p-5 flex flex-wrap items-end gap-3">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-white/50">Publish at</label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="mt-2 bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D61F1F]"
            />
          </div>
          <button
            onClick={handleSchedule}
            disabled={!scheduleDate}
            className="px-5 py-2.5 bg-[#D61F1F] hover:bg-[#b51919] disabled:opacity-40 text-[11px] tracking-[0.2em] uppercase"
          >
            Schedule Publication
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-[#D61F1F]/15 border border-[#D61F1F]/30 text-[#D61F1F] text-sm">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          <input
            placeholder="Article title"
            value={article.title}
            onChange={(e) => update('title', e.target.value)}
            className="w-full bg-transparent border-b border-white/10 pb-3 text-3xl font-serif text-white focus:outline-none focus:border-[#D61F1F]"
          />
          <textarea
            placeholder="Excerpt (1-2 sentences)"
            value={article.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            rows={2}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/90 focus:outline-none focus:border-[#D61F1F] resize-none"
          />

          {/* Toolbar */}
          {!showPreview && (
            <div className="flex flex-wrap gap-1 bg-white/5 border border-white/10 p-1.5">
              <ToolbarBtn onClick={() => insertMarkdown('## ', '')} icon={Heading2} label="H2" />
              <ToolbarBtn onClick={() => insertMarkdown('**', '**')} icon={Bold} label="Bold" />
              <ToolbarBtn onClick={() => insertMarkdown('*', '*')} icon={Italic} label="Italic" />
              <ToolbarBtn onClick={() => insertMarkdown('\n- ', '')} icon={List} label="List" />
              <ToolbarBtn onClick={() => insertMarkdown('\n1. ', '')} icon={ListOrdered} label="Numbered" />
              <ToolbarBtn onClick={() => insertMarkdown('[', '](https://)')} icon={LinkIcon} label="Link" />
            </div>
          )}

          {showPreview ? (
            <div className="bg-white text-[#111] p-8 lg:p-10 min-h-[480px]">
              <h1 className="font-serif text-4xl mb-3">{article.title || 'Untitled'}</h1>
              {article.excerpt && (
                <p className="text-lg text-[#666] mb-8 font-light">{article.excerpt}</p>
              )}
              <div
                className="text-base"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(article.body_markdown) }}
              />
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              placeholder={`Start writing... Use markdown:

## Heading
**bold** *italic*
- list item
1. numbered item
[link](https://)`}
              value={article.body_markdown}
              onChange={(e) => update('body_markdown', e.target.value)}
              rows={22}
              className="markdown-editor w-full bg-white/5 border border-white/10 px-4 py-4 text-sm text-white/90 focus:outline-none focus:border-[#D61F1F] resize-y"
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Field label="Slug">
            <input
              value={article.slug}
              onChange={(e) => update('slug', slugify(e.target.value))}
              className="w-full bg-black/40 border border-white/10 px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-[#D61F1F]"
            />
            {originalSlug && originalSlug !== article.slug && (
              <p className="text-[10px] text-amber-400 mt-1.5">Slug change will break existing links.</p>
            )}
          </Field>
          <Field label="Category">
            <select
              value={article.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full bg-black/40 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:border-[#D61F1F]"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Author">
            <input
              value={article.author_name}
              onChange={(e) => update('author_name', e.target.value)}
              className="w-full bg-black/40 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:border-[#D61F1F]"
            />
          </Field>
          <Field label="Read time">
            <input
              value={article.read_time}
              placeholder="e.g. 8 min read"
              onChange={(e) => update('read_time', e.target.value)}
              className="w-full bg-black/40 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:border-[#D61F1F]"
            />
          </Field>
          <Field label="Cover image URL">
            <div className="flex gap-2">
              <input
                value={article.cover_image_url}
                onChange={(e) => update('cover_image_url', e.target.value)}
                placeholder="https://..."
                className="flex-1 bg-black/40 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:border-[#D61F1F]"
              />
            </div>
            {article.cover_image_url && (
              <div className="mt-3 aspect-[16/9] overflow-hidden bg-black/40 border border-white/10">
                <img src={article.cover_image_url} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            {!article.cover_image_url && (
              <div className="mt-3 aspect-[16/9] flex items-center justify-center bg-black/40 border border-dashed border-white/15 text-white/30">
                <ImageIcon size={28} strokeWidth={1.2} />
              </div>
            )}
          </Field>

          {article.published_at && (
            <Field label={article.status === 'scheduled' ? 'Scheduled for' : 'Published at'}>
              <p className="text-sm text-white/70">
                {new Date(article.published_at).toLocaleString()}
              </p>
            </Field>
          )}
        </div>
      </div>
    </div>
  );
};

const ToolbarBtn: React.FC<{ onClick: () => void; icon: any; label: string }> = ({ onClick, icon: Icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    className="px-2.5 py-1.5 hover:bg-white/10 text-white/70 hover:text-white"
  >
    <Icon size={14} />
  </button>
);

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2 block">{label}</label>
    {children}
  </div>
);

export default ArticleEditor;
