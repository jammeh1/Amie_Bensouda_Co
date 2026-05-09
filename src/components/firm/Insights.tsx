import React, { useEffect, useMemo, useState } from 'react';
import { Search, ArrowUpRight, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const categories = ['All', 'Investment', 'Banking', 'Energy', 'Tax', 'Corporate', 'Maritime'];
const PAGE_SIZE = 6;

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  read_time: string | null;
}

const Insights: React.FC = () => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      let q = supabase
        .from('articles')
        .select('id,title,slug,category,excerpt,cover_image_url,published_at,read_time', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (cat !== 'All') q = q.eq('category', cat);
      if (query.trim()) q = q.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`);

      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, count, error } = await q.range(from, to);
      if (!error && data) {
        setArticles(data as Article[]);
        setTotal(count || 0);
      }
      setLoading(false);
    };
    fetchArticles();
  }, [cat, query, page]);

  useEffect(() => { setPage(0); }, [cat, query]);

  const featured = articles[0];
  const rest = articles.slice(1);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const formatDate = (iso: string | null) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="insights" className="py-28 lg:py-36 bg-[#EDEDED]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#D61F1F]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                Insights & News Hub
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.1] text-[#111] font-medium">
              Legal intelligence<br />from West Africa.
            </h2>
          </div>

          <div className="lg:col-span-5 flex items-end">
            <div className="relative w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search publications..."
                className="w-full bg-white border border-black/10 pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#D61F1F]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors ${
                cat === c ? 'bg-[#111] text-white' : 'bg-white text-[#111] hover:bg-[#111] hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 animate-pulse">
              <div className="aspect-[16/10] bg-white/60 mb-6" />
              <div className="h-4 w-24 bg-white/60 mb-3" />
              <div className="h-8 w-3/4 bg-white/60 mb-3" />
              <div className="h-4 w-full bg-white/60" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              {[1,2,3,4].map(i => <div key={i} className="h-20 bg-white/60 animate-pulse" />)}
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white p-16 text-center text-[#666]">
            No insights match your search.
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-12 gap-8">
              {featured && (
                <Link to={`/insights/${featured.slug}`} className="lg:col-span-7 group">
                  <div className="aspect-[16/10] overflow-hidden mb-6 bg-[#111]">
                    {featured.cover_image_url && (
                      <img
                        src={featured.cover_image_url}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F]">
                    {featured.category} · Featured
                  </span>
                  <h3 className="font-serif text-3xl lg:text-4xl mt-3 text-[#111] group-hover:text-[#D61F1F] transition-colors leading-tight">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-[#2A2A2A] font-light leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 mt-5 text-xs text-[#666] tracking-wider">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(featured.published_at)}</span>
                    {featured.read_time && (
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {featured.read_time}</span>
                    )}
                  </div>
                </Link>
              )}

              <div className="lg:col-span-5 flex flex-col divide-y divide-black/10">
                {rest.map((p) => (
                  <Link to={`/insights/${p.slug}`} key={p.id} className="group py-6 first:pt-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D61F1F]">
                          {p.category}
                        </span>
                        <h4 className="font-serif text-xl mt-2 text-[#111] group-hover:text-[#D61F1F] transition-colors leading-snug">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-3 text-xs text-[#666]">
                          <span>{formatDate(p.published_at)}</span>
                          {p.read_time && <><span>·</span><span>{p.read_time}</span></>}
                        </div>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-[#D61F1F] shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-between border-t border-black/10 pt-8">
                <div className="text-xs text-[#666] tracking-wider">
                  Page {page + 1} of {totalPages} · {total} articles
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-[11px] tracking-[0.2em] uppercase disabled:opacity-40 hover:bg-[#111] hover:text-white transition-colors"
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#111] text-white text-[11px] tracking-[0.2em] uppercase disabled:opacity-40 hover:bg-[#D61F1F] transition-colors"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Insights;
