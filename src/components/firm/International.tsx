import React from 'react';
import { Globe2, ShieldCheck, TrendingUp, Building2, Handshake, FileCheck2 } from 'lucide-react';

const services = [
  { icon: Globe2, title: 'Market Entry Advisory', desc: 'End-to-end guidance for foreign investors entering The Gambia, from corporate structuring to regulatory approvals.' },
  { icon: ShieldCheck, title: 'Investor Protection', desc: 'Bilateral investment treaty analysis, local content compliance, and political risk mitigation.' },
  { icon: TrendingUp, title: 'Cross-Border Transactions', desc: 'Coordinating with leading firms across West Africa, the UK, US and EU on multi-jurisdictional deals.' },
  { icon: Building2, title: 'Corporate Establishment', desc: 'Company formation, GIEPA incentives, free zone licensing, and tax-efficient structuring.' },
  { icon: Handshake, title: 'Government Liaison', desc: 'Decades of relationships with regulators, ministries, and state institutions for efficient approvals.' },
  { icon: FileCheck2, title: 'Ongoing Compliance', desc: 'Annual filings, regulatory reporting, work permits, and continuous corporate secretarial support.' },
];

const clients = [
  'Foreign Investors',
  'International Banks',
  'Multinational Corporations',
  'Diplomatic Missions',
  'Development Finance Institutions',
  'NGOs & Foundations',
  'Sovereign Wealth Funds',
  'Private Equity Funds',
];

const International: React.FC = () => {
  return (
    <section id="international" className="relative bg-[#111] text-white">
      <div className="absolute inset-0 opacity-25">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335531854_785c4608.png"
          alt="Banjul business district"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#111]/80 to-[#111]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#D61F1F]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                International Clients
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] font-medium">
              Your trusted partner<br />for doing business<br />
              <span className="italic text-[#D61F1F]">in The Gambia.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-white/70 text-lg font-light leading-relaxed">
              The Gambia offers one of West Africa's most welcoming environments for
              foreign investment — political stability, an open economy, GIEPA incentives,
              and direct access to ECOWAS markets. We help international clients capture
              that opportunity safely and efficiently.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
              >
                <Icon className="text-[#D61F1F] mb-5" size={28} strokeWidth={1.2} />
                <h4 className="font-serif text-xl mb-3">{s.title}</h4>
                <p className="text-white/60 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-12">
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-6">
            Clients We Serve
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
            {clients.map((c) => (
              <div key={c} className="flex items-center gap-3 text-white/80">
                <span className="w-1.5 h-1.5 bg-[#D61F1F]" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default International;
