import React, { useState } from 'react';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

const openings = [
  { role: 'Senior Associate — Banking & Finance', type: 'Partner Track', location: 'Banjul' },
  { role: 'Associate — Corporate & Commercial', type: 'Full-time', location: 'Banjul' },
  { role: 'Associate — Litigation & Arbitration', type: 'Full-time', location: 'Banjul' },
  { role: 'Graduate Trainee Programme 2026', type: 'Training Contract', location: 'Banjul' },
  { role: 'Legal Internship — Summer 2026', type: 'Internship', location: 'Banjul' },
  { role: 'Knowledge Management Lawyer', type: 'Full-time', location: 'Banjul' },
];

const benefits = [
  'World-class international training',
  'Direct exposure to flagship transactions',
  'Mentorship from market-leading partners',
  'Generous study & qualification support',
  'Secondment opportunities abroad',
  'Health, wellness & retirement plan',
];

const Careers: React.FC = () => {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const name = form.get('name') as string;

    try {
      await fetch('https://famous.ai/api/crm/69ff3e56a57d3eb9a2a6cc15/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          source: 'careers-application',
          tags: ['careers', activeRole || 'general-application'],
        }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  return (
    <section id="careers" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#D61F1F]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                Careers
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.1] text-[#111] font-medium">
              Build your career<br />at a firm that<br />sets the standard.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end">
            <p className="text-[#2A2A2A] text-lg font-light leading-relaxed mb-8">
              We invest in exceptional people. Our lawyers work alongside the world's
              leading institutions on landmark matters — and grow within a culture of
              excellence, integrity, and genuine collegiality.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-2 text-sm text-[#111]">
                  <CheckCircle2 size={16} className="text-[#D61F1F] mt-0.5 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#EDEDED]">
          <div className="px-8 lg:px-10 py-6 border-b border-black/10 flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#111]">Current Openings</h3>
            <span className="text-xs tracking-[0.2em] uppercase text-[#666]">
              {openings.length} positions
            </span>
          </div>
          <div className="divide-y divide-black/10">
            {openings.map((o) => (
              <button
                key={o.role}
                onClick={() => {
                  setActiveRole(o.role);
                  setSubmitted(false);
                }}
                className="group w-full text-left px-8 lg:px-10 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition-colors"
              >
                <div>
                  <h4 className="font-serif text-xl text-[#111] group-hover:text-[#D61F1F] transition-colors">
                    {o.role}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-[#666] tracking-wider mt-1.5">
                    <span>{o.type}</span>
                    <span>·</span>
                    <span>{o.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-[#D61F1F]">
                  Apply Now
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {activeRole && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6"
          onClick={() => setActiveRole(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto"
          >
            <div className="p-8 lg:p-10 relative">
              <button
                onClick={() => setActiveRole(null)}
                className="absolute top-5 right-5 p-2 hover:bg-black/5"
              >
                <X size={20} />
              </button>
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F]">
                Application
              </span>
              <h3 className="font-serif text-3xl mt-3 mb-6 text-[#111]">{activeRole}</h3>

              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="text-[#D61F1F] mx-auto mb-4" size={48} strokeWidth={1.2} />
                  <h4 className="font-serif text-2xl text-[#111] mb-2">Application received</h4>
                  <p className="text-[#666]">Our recruitment team will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    required
                    placeholder="Full name"
                    className="w-full bg-[#F7F7F7] border border-black/10 px-4 py-3.5 text-sm focus:outline-none focus:border-[#D61F1F]"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full bg-[#F7F7F7] border border-black/10 px-4 py-3.5 text-sm focus:outline-none focus:border-[#D61F1F]"
                  />
                  <input
                    name="phone"
                    placeholder="Phone (optional)"
                    className="w-full bg-[#F7F7F7] border border-black/10 px-4 py-3.5 text-sm focus:outline-none focus:border-[#D61F1F]"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Cover note"
                    className="w-full bg-[#F7F7F7] border border-black/10 px-4 py-3.5 text-sm focus:outline-none focus:border-[#D61F1F] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#D61F1F] hover:bg-[#b51919] text-white py-4 text-[12px] tracking-[0.24em] uppercase font-medium transition-colors"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Careers;
