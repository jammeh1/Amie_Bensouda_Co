import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard, FileText, Users, Image as ImageIcon, Mail,
  Settings, LogOut, Search, Plus, Edit3, Trash2, Eye, Lock, ShieldCheck,
  TrendingUp, MessageSquare, Calendar, Clock, Loader2,
} from 'lucide-react';
import Logo from '@/components/firm/Logo';
import { team } from '@/components/firm/data';
import { supabase } from '@/lib/supabase';
import ArticleEditor from '@/components/admin/ArticleEditor';


type Tab = 'overview' | 'content' | 'team' | 'media' | 'inquiries' | 'settings';

const SecureAdmin: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const u = form.get('username') as string;
    const p = form.get('password') as string;
    if (u === 'admin' && p === 'bensouda2026') {
      setAuthed(true);
      setError('');
    } else {
      setError('Invalid credentials. Use admin / bensouda2026 for demo.');
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center p-6">
        <div className="absolute top-6 left-6">
          <Logo variant="light" />
        </div>
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 text-[#D61F1F] mb-4">
            <Lock size={16} />
            <span className="text-[11px] tracking-[0.3em] uppercase">Restricted Access</span>
          </div>
          <h1 className="font-serif text-4xl mb-2">Management Portal</h1>
          <p className="text-white/50 text-sm mb-10">
            Authorised personnel only. All access is logged.
          </p>
          <form onSubmit={handleLogin} className="space-y-4 bg-white/5 border border-white/10 p-8">
            <div>
              <label className="text-[11px] tracking-[0.3em] uppercase text-white/60">Username</label>
              <input
                name="username"
                required
                defaultValue="admin"
                className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#D61F1F]"
              />
            </div>
            <div>
              <label className="text-[11px] tracking-[0.3em] uppercase text-white/60">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="mt-2 w-full bg-black/40 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#D61F1F]"
              />
            </div>
            {error && <p className="text-[#D61F1F] text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#D61F1F] hover:bg-[#b51919] py-3.5 text-[11px] tracking-[0.24em] uppercase font-medium"
            >
              Sign In Securely
            </button>
            <p className="text-[10px] text-white/30 text-center pt-2">
              Demo credentials: admin / bensouda2026
            </p>
          </form>
          <div className="mt-6 flex items-center gap-2 text-xs text-white/40">
            <ShieldCheck size={14} />
            <span>Encrypted session · Activity logged</span>
          </div>
        </div>
      </div>
    );
  }

  const sidebarItems: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Logo variant="light" />
          <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mt-3 ml-12">
            Admin
          </div>
        </div>
        <nav className="flex-1 p-3">
          {sidebarItems.map((it) => {
            const Icon = it.icon;
            const active = tab === it.id;
            return (
              <button
                key={it.id}
                onClick={() => setTab(it.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  active ? 'bg-[#D61F1F]/10 text-[#D61F1F] border-l-2 border-[#D61F1F]' : 'text-white/60 hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <Icon size={16} /> {it.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={() => setAuthed(false)}
          className="m-3 p-3 flex items-center gap-3 text-sm text-white/60 hover:bg-white/5 border border-white/10"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-white/5 px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Search size={16} className="text-white/40" />
            <input
              placeholder="Search..."
              className="bg-transparent text-sm text-white/80 focus:outline-none w-64"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <ShieldCheck size={14} className="text-[#D61F1F]" />
            <span>Secure session · admin@bensoudaco.com</span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {tab === 'overview' && <Overview />}
          {tab === 'content' && <Content />}
          {tab === 'team' && <TeamMgmt />}
          {tab === 'media' && <Media />}
          {tab === 'inquiries' && <Inquiries />}
          {tab === 'settings' && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/[0.03] border border-white/5 ${className}`}>{children}</div>
);

const Overview: React.FC = () => {
  const kpis = [
    { label: 'Published Articles', value: 42, trend: '+8 this month', icon: FileText },
    { label: 'Team Members', value: 8, trend: 'All active', icon: Users },
    { label: 'New Inquiries', value: 17, trend: '+12% week', icon: MessageSquare },
    { label: 'Media Files', value: 213, trend: '4.2 GB used', icon: ImageIcon },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl">Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">Welcome back. Here's what's happening at the firm.</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label} className="p-6">
              <div className="flex items-start justify-between mb-6">
                <Icon className="text-[#D61F1F]" size={20} />
                <TrendingUp size={14} className="text-white/30" />
              </div>
              <div className="text-3xl font-serif">{k.value}</div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-2">{k.label}</div>
              <div className="text-xs text-white/40 mt-1">{k.trend}</div>
            </Card>
          );
        })}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-serif text-xl mb-5">Recent Activity</h3>
          <ul className="space-y-4 text-sm">
            {[
              { who: 'Amie Bensouda', what: 'published "Doing Business in The Gambia: 2026 Guide"', when: '2h ago' },
              { who: 'Lamin Ceesay', what: 'updated practice page "Banking & Finance"', when: 'Yesterday' },
              { who: 'System', what: 'received 3 new client inquiries', when: 'Yesterday' },
              { who: 'Fatou Jallow', what: 'uploaded 4 photos to Media Library', when: '2d ago' },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0">
                <div className="w-2 h-2 bg-[#D61F1F] mt-2" />
                <div className="flex-1">
                  <div className="text-white/90">
                    <span className="font-medium">{a.who}</span>{' '}
                    <span className="text-white/60">{a.what}</span>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{a.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="font-serif text-xl mb-5">Quick Actions</h3>
          <div className="space-y-2">
            {['New Article', 'Add Team Member', 'Upload Media', 'Review Inquiries'].map((a) => (
              <button key={a} className="w-full text-left px-4 py-3 bg-white/[0.03] hover:bg-[#D61F1F] hover:text-white text-sm transition-colors flex items-center justify-between">
                {a} <Plus size={14} />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const Content: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'scheduled' | 'published'>('all');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<string | 'new' | null>(null);

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from('articles')
      .select('id,title,slug,category,status,published_at,updated_at,read_time,author_name')
      .order('updated_at', { ascending: false });
    if (filter !== 'all') q = q.eq('status', filter);
    if (search.trim()) q = q.ilike('title', `%${search}%`);
    const { data } = await q;
    setArticles(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter, search]);

  if (editing !== null) {
    return <ArticleEditor articleId={editing} onBack={() => { setEditing(null); load(); }} />;
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article permanently?')) return;
    await supabase.from('articles').delete().eq('id', id);
    load();
  };

  const handleQuickPublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const updates: any = { status: newStatus, updated_at: new Date().toISOString() };
    if (newStatus === 'published') updates.published_at = new Date().toISOString();
    await supabase.from('articles').update(updates).eq('id', id);
    load();
  };

  const statusBadge = (s: string) => {
    const map: any = {
      draft: 'bg-white/10 text-white/70',
      scheduled: 'bg-amber-500/15 text-amber-400',
      published: 'bg-[#D61F1F]/15 text-[#D61F1F]',
    };
    return <span className={`px-2 py-1 text-[10px] tracking-[0.2em] uppercase ${map[s] || map.draft}`}>{s}</span>;
  };

  const formatDate = (iso: string | null) => iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  const counts = articles.reduce((acc: any, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc; }, {});

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="font-serif text-3xl">Content</h1>
          <p className="text-white/50 text-sm mt-1">Manage articles, insights and publications.</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-2 bg-[#D61F1F] hover:bg-[#b51919] px-5 py-3 text-[11px] tracking-[0.24em] uppercase"
        >
          <Plus size={14} /> New Article
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {(['all', 'published', 'scheduled', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                filter === f ? 'bg-[#D61F1F] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {f} {f !== 'all' && counts[f] !== undefined && <span className="ml-1 opacity-60">({counts[f] || 0})</span>}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search titles..."
            className="bg-white/5 border border-white/10 pl-9 pr-4 py-2.5 text-sm w-64 focus:outline-none focus:border-[#D61F1F]"
          />
        </div>
      </div>

      <Card>
        {loading ? (
          <div className="flex items-center justify-center py-20 text-white/40">
            <Loader2 className="animate-spin" size={20} />
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center text-white/50">
            <FileText className="mx-auto mb-3 text-white/20" size={36} strokeWidth={1.2} />
            <p>No articles yet. Click "New Article" to publish your first insight.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[10px] tracking-[0.2em] uppercase text-white/40 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setEditing(p.id)}
                        className="font-medium text-left hover:text-[#D61F1F]"
                      >
                        {p.title}
                      </button>
                      <div className="text-[10px] text-white/30 font-mono mt-0.5">/{p.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-white/60">{p.category}</td>
                    <td className="px-6 py-4 text-white/60">{p.author_name || '—'}</td>
                    <td className="px-6 py-4 text-white/60">
                      {p.status === 'scheduled' ? (
                        <span className="flex items-center gap-1.5 text-amber-400">
                          <Clock size={11} /> {formatDate(p.published_at)}
                        </span>
                      ) : (
                        formatDate(p.published_at || p.updated_at)
                      )}
                    </td>
                    <td className="px-6 py-4">{statusBadge(p.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 text-white/60">
                        {p.status === 'published' && (
                          <a
                            href={`/insights/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:text-white"
                            title="View"
                          >
                            <Eye size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => handleQuickPublish(p.id, p.status)}
                          className="p-2 hover:text-[#D61F1F]"
                          title={p.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          <Calendar size={14} />
                        </button>
                        <button
                          onClick={() => setEditing(p.id)}
                          className="p-2 hover:text-white"
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 hover:text-[#D61F1F]"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};



const TeamMgmt: React.FC = () => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-serif text-3xl">Team</h1>
        <p className="text-white/50 text-sm mt-1">Manage attorney profiles.</p>
      </div>
      <button className="inline-flex items-center gap-2 bg-[#D61F1F] px-5 py-3 text-[11px] tracking-[0.24em] uppercase">
        <Plus size={14} /> Add Member
      </button>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {team.map((m) => (
        <Card key={m.name} className="overflow-hidden">
          <div className="aspect-[4/5] bg-white/5">
            <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h4 className="font-serif text-lg">{m.name}</h4>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">{m.role}</p>
            <div className="flex gap-2 mt-3 text-white/50">
              <button className="p-1.5 hover:text-white"><Edit3 size={12} /></button>
              <button className="p-1.5 hover:text-[#D61F1F]"><Trash2 size={12} /></button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Media: React.FC = () => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <h1 className="font-serif text-3xl">Media Library</h1>
      <button className="inline-flex items-center gap-2 bg-[#D61F1F] px-5 py-3 text-[11px] tracking-[0.24em] uppercase">
        <Plus size={14} /> Upload
      </button>
    </div>
    <Card className="p-10 text-center border-2 border-dashed border-white/10">
      <ImageIcon className="mx-auto mb-3 text-white/30" size={48} strokeWidth={1.2} />
      <p className="text-white/50">Drag and drop files here, or click to browse.</p>
      <p className="text-xs text-white/30 mt-2">JPG, PNG, PDF · Max 10MB per file</p>
    </Card>
  </div>
);

const Inquiries: React.FC = () => (
  <div>
    <h1 className="font-serif text-3xl mb-8">Client Inquiries</h1>
    <Card>
      {[
        { name: 'Standard Chartered plc', subject: 'Project finance — solar PPA', when: '1h ago', tag: 'Banking' },
        { name: 'Trafigura Group', subject: 'Petroleum trading entity setup', when: '3h ago', tag: 'Oil & Gas' },
        { name: 'IFC', subject: 'DFI lending facility documentation', when: 'Yesterday', tag: 'Banking' },
        { name: 'Bolloré Africa', subject: 'Port concession dispute', when: '2d ago', tag: 'Litigation' },
      ].map((i, idx) => (
        <div key={idx} className="px-6 py-5 border-b border-white/5 last:border-0 flex items-center justify-between hover:bg-white/[0.02]">
          <div>
            <h4 className="font-medium">{i.name}</h4>
            <p className="text-sm text-white/60 mt-0.5">{i.subject}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 bg-white/5 text-[10px] tracking-[0.2em] uppercase text-white/60">{i.tag}</span>
            <span className="text-xs text-white/40">{i.when}</span>
          </div>
        </div>
      ))}
    </Card>
  </div>
);

const SettingsPanel: React.FC = () => (
  <div>
    <h1 className="font-serif text-3xl mb-8">Settings</h1>
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="font-serif text-xl mb-4">Firm Information</h3>
        <div className="space-y-3 text-sm">
          {['Firm Name', 'Address', 'Phone', 'Email'].map((f) => (
            <div key={f}>
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/50">{f}</label>
              <input className="mt-1 w-full bg-black/30 border border-white/10 px-3 py-2 text-sm" defaultValue="—" />
            </div>
          ))}
          <button className="bg-[#D61F1F] hover:bg-[#b51919] px-5 py-2.5 text-[11px] tracking-[0.24em] uppercase mt-3">
            Save Changes
          </button>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-serif text-xl mb-4">Security</h3>
        <ul className="space-y-3 text-sm text-white/70">
          <li className="flex justify-between"><span>Two-factor authentication</span><span className="text-[#D61F1F]">Enabled</span></li>
          <li className="flex justify-between"><span>Session timeout</span><span className="text-white/60">30 min</span></li>
          <li className="flex justify-between"><span>Activity logging</span><span className="text-[#D61F1F]">Active</span></li>
          <li className="flex justify-between"><span>Backup</span><span className="text-white/60">Daily, 02:00 GMT</span></li>
        </ul>
      </Card>
    </div>
  </div>
);

export default SecureAdmin;
