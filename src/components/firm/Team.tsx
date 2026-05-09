import React, { useState } from 'react';
import { team } from './data';
import { Mail, Linkedin, X, GraduationCap, Languages, Briefcase } from 'lucide-react';

const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const featured = team.find((m) => m.featured)!;
  const others = team.filter((m) => !m.featured);

  return (
    <section id="team" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#D61F1F]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                Our People
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.1] text-[#111] font-medium">
              Counsel of the<br />highest calibre.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-[#2A2A2A] text-lg font-light leading-relaxed">
              Our partners and associates combine elite international training with deep
              local insight — the rare combination that defines our practice.
            </p>
          </div>
        </div>

        {/* Featured Managing Partner */}
        <div className="grid lg:grid-cols-12 gap-10 mb-24 bg-[#111] text-white p-8 lg:p-12">
          <div className="lg:col-span-5 aspect-[4/5] overflow-hidden">
            <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F]">
              Managing Partner
            </span>
            <h3 className="font-serif text-5xl lg:text-6xl mt-3 font-medium">{featured.name}</h3>
            <p className="mt-4 text-white/60 text-sm tracking-wider uppercase">{featured.role}</p>
            <p className="mt-8 text-white/80 text-lg font-light leading-relaxed">{featured.bio}</p>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-3">
                  Expertise
                </div>
                <ul className="space-y-2 text-white/80 text-sm">
                  {featured.expertise.map((e) => <li key={e}>— {e}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-3">
                  Languages
                </div>
                <ul className="space-y-2 text-white/80 text-sm">
                  {featured.languages.map((l) => <li key={l}>— {l}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {others.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setActiveIndex(team.indexOf(m))}
              className="group text-left"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#EDEDED] relative">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="font-serif text-xl mt-5 text-[#111] group-hover:text-[#D61F1F] transition-colors">
                {m.name}
              </h4>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#666] mt-1.5">{m.role}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Bio Modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto grid sm:grid-cols-2"
          >
            {(() => {
              const m = team[activeIndex];
              return (
                <>
                  <div className="aspect-[4/5] sm:aspect-auto overflow-hidden">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 lg:p-10 relative">
                    <button
                      onClick={() => setActiveIndex(null)}
                      className="absolute top-5 right-5 p-2 hover:bg-black/5"
                    >
                      <X size={20} />
                    </button>
                    <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F]">
                      {m.role}
                    </span>
                    <h3 className="font-serif text-4xl mt-3 text-[#111] font-medium">{m.name}</h3>
                    <p className="mt-5 text-[#2A2A2A] font-light leading-relaxed">{m.bio}</p>

                    <div className="mt-8 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-3">
                          <Briefcase size={12} /> Expertise
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {m.expertise.map((e) => (
                            <span key={e} className="px-3 py-1.5 bg-[#EDEDED] text-xs text-[#111]">
                              {e}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-3">
                          <GraduationCap size={12} /> Qualifications
                        </div>
                        <ul className="space-y-1.5 text-sm text-[#2A2A2A]">
                          {m.qualifications.map((q) => <li key={q}>— {q}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-3">
                          <Languages size={12} /> Languages
                        </div>
                        <p className="text-sm text-[#2A2A2A]">{m.languages.join(' · ')}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8 pt-6 border-t border-black/10">
                      <a
                        href={`mailto:contact@bensoudaco.com`}
                        className="inline-flex items-center gap-2 px-4 py-3 bg-[#111] text-white text-[11px] tracking-[0.2em] uppercase hover:bg-[#D61F1F] transition-colors"
                      >
                        <Mail size={14} /> Email
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-3 border border-black/20 text-[#111] text-[11px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors"
                      >
                        <Linkedin size={14} /> LinkedIn
                      </a>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default Team;
