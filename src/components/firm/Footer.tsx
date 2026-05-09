import React, { useState } from 'react';
import Logo from './Logo';
import { Linkedin, Twitter, ArrowRight, CheckCircle2 } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('https://famous.ai/api/crm/69ff3e56a57d3eb9a2a6cc15/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'footer-signup',
          tags: ['newsletter', 'insights'],
        }),
      });
    } catch (_) {}
    setDone(true);
    setEmail('');
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#111] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F]">
              Stay Informed
            </span>
            <h3 className="font-serif text-3xl lg:text-4xl mt-3 font-medium leading-tight">
              Receive our legal insights<br />direct to your inbox.
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            {done ? (
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="text-[#D61F1F]" size={22} />
                <span>Thank you for subscribing.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/15 px-4 py-4 text-sm focus:outline-none focus:border-[#D61F1F] placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#D61F1F] hover:bg-[#b51919] px-6 py-4 text-[11px] tracking-[0.24em] uppercase font-medium transition-colors"
                >
                  Subscribe <ArrowRight size={14} />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Logo variant="light" />
          <p className="text-white/60 mt-6 max-w-sm font-light leading-relaxed">
            One of The Gambia's most prestigious full-service law firms — established 1995.
            Trusted counsel for international business.
          </p>
          <div className="flex gap-3 mt-8">
            <a href="#" className="p-3 border border-white/15 hover:border-[#D61F1F] hover:bg-[#D61F1F] transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="#" className="p-3 border border-white/15 hover:border-[#D61F1F] hover:bg-[#D61F1F] transition-colors">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-5">Firm</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><button onClick={() => scrollTo('about')} className="hover:text-white">About</button></li>
            <li><button onClick={() => scrollTo('team')} className="hover:text-white">Our Team</button></li>
            <li><button onClick={() => scrollTo('careers')} className="hover:text-white">Careers</button></li>
            <li><button onClick={() => scrollTo('insights')} className="hover:text-white">Insights</button></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-5">Practice</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><button onClick={() => scrollTo('practice')} className="hover:text-white">Corporate &amp; Commercial</button></li>
            <li><button onClick={() => scrollTo('practice')} className="hover:text-white">Banking &amp; Finance</button></li>
            <li><button onClick={() => scrollTo('practice')} className="hover:text-white">Energy &amp; Infrastructure</button></li>
            <li><button onClick={() => scrollTo('practice')} className="hover:text-white">Litigation &amp; Arbitration</button></li>
            <li><button onClick={() => scrollTo('practice')} className="hover:text-white">All Practice Areas →</button></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-5">Contact</h4>
          <address className="not-italic text-sm text-white/70 leading-relaxed">
            61 Hagan Street<br />
            Banjul, The Gambia<br />
            +220 422 7805<br />
            info@bensoudaco.com
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} Amie Bensouda &amp; Co — Corporate Legal Services LP. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
