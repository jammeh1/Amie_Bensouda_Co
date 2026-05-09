import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowUpRight, User } from 'lucide-react';
import Navigation from '@/components/firm/Navigation';
import Footer from '@/components/firm/Footer';
import StickyCTA from '@/components/firm/StickyCTA';
import { supabase } from '@/lib/supabase';
import { renderMarkdown } from '@/lib/markdown';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  body_markdown: string | null;
  cover_image_url: string | null;
  author_name: string | null;
  published_at: string | null;
  read_time: string | null;
}

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    const fetchData = async () => {
      setLoading(true);
      setNotFound(false);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setArticle(data as Article);

      const { data: rel } = await supabase
        .from('articles')
        .select('id,title,slug,category,excerpt,cover_image_url,published_at,read_time,body_markdown,author_name')
        .eq('status', 'published')
        .eq('category', data.category)
        .neq('id', data.id)
        .order('published_at', { ascending: false })
        .limit(3);
      setRelated((rel as Article[]) || []);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-40 max-w-4xl mx-auto px-6 lg:px-10">
          <div className="h-6 w-32 bg-black/5 mb-4 animate-pulse" />
          <div className="h-12 w-3/4 bg-black/5 mb-3 animate-pulse" />
          <div className="h-12 w-1/2 bg-black/5 mb-10 animate-pulse" />
          <div className="aspect-[16/9] bg-black/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-4">404</span>
          <h1 className="font-serif text-5xl mb-4">Article Not Found</h1>
          <p className="text-[#666] mb-8">This article may have been moved or unpublished.</p>
          <Link
            to="/#insights"
            className="inline-flex items-center gap-2 bg-[#D61F1F] hover:bg-[#b51919] text-white px-7 py-4 text-[11px] tracking-[0.24em] uppercase"
          >
            <ArrowLeft size={14} /> Back to Insights
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header / Hero */}
      <header className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[#111] text-white overflow-hidden">
        {article.cover_image_url && (
          <div className="absolute inset-0 opacity-30">
            <img src={article.cover_image_url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/70 to-[#111]" />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <Link
            to="/#insights"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-[#D61F1F] mb-8"
          >
            <ArrowLeft size={14} /> All Insights
          </Link>
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F]">
            {article.category}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] font-medium text-balance">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-6 text-lg sm:text-xl text-white/80 font-light leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-white/60 tracking-wider border-t border-white/10 pt-6">
            {article.author_name && (
              <span className="flex items-center gap-2"><User size={13} /> {article.author_name}</span>
            )}
            <span className="flex items-center gap-2"><Calendar size={13} /> {formatDate(article.published_at)}</span>
            {article.read_time && (
              <span className="flex items-center gap-2"><Clock size={13} /> {article.read_time}</span>
            )}
          </div>
        </div>
      </header>

      {/* Cover image */}
      {article.cover_image_url && (
        <div className="max-w-5xl mx-auto px-6 lg:px-10 -mt-8 lg:-mt-16 mb-12">
          <div className="aspect-[16/9] overflow-hidden bg-[#EDEDED] shadow-xl">
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div
          className="text-lg font-light"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.body_markdown || '') }}
        />
        <div className="mt-16 pt-10 border-t border-black/10 flex items-center justify-between">
          <Link
            to="/#insights"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-[#111] hover:text-[#D61F1F]"
          >
            <ArrowLeft size={14} /> Back to Insights
          </Link>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-[#D61F1F] hover:bg-[#b51919] text-white px-6 py-3.5 text-[11px] tracking-[0.24em] uppercase"
          >
            Speak to a Partner <ArrowUpRight size={14} />
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[#EDEDED] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-10 bg-[#D61F1F]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                Related Insights
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link to={`/insights/${r.slug}`} key={r.id} className="group bg-white">
                  <div className="aspect-[16/10] overflow-hidden bg-[#111]">
                    {r.cover_image_url && (
                      <img
                        src={r.cover_image_url}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#D61F1F]">
                      {r.category}
                    </span>
                    <h4 className="font-serif text-xl mt-3 text-[#111] group-hover:text-[#D61F1F] transition-colors leading-snug">
                      {r.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-4 text-xs text-[#666]">
                      <span>{formatDate(r.published_at)}</span>
                      {r.read_time && <><span>·</span><span>{r.read_time}</span></>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <StickyCTA />
    </div>
  );
};

export default ArticleDetail;
