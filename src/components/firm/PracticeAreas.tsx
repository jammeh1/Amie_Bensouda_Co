import React, { useState } from 'react';
import { practiceAreas } from './data';
import { ArrowUpRight, X } from 'lucide-react';

const PracticeAreas: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="practice" className="py-28 lg:py-36 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#D61F1F]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                Practice Areas
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.1] font-medium">
              Full-service counsel<br />
              for complex matters.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-white/70 text-lg font-light leading-relaxed">
              We bring depth across eleven core practice areas, allowing us to advise
              seamlessly on the multi-disciplinary issues facing modern international
              business in The Gambia.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {practiceAreas.map((p, i) => {
            const Icon = p.icon;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group relative bg-[#111111] hover:bg-[#1a1a1a] p-8 lg:p-10 text-left transition-colors duration-300 min-h-[280px] flex flex-col justify-between"
              >
                <div>
                  <Icon
                    size={32}
                    strokeWidth={1.2}
                    className="text-[#D61F1F] mb-6 transition-transform duration-300 group-hover:-translate-y-1"
                  />
                  <h3 className="font-serif text-2xl mb-3">{p.title}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed line-clamp-3">
                    {p.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
                    Learn more
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-[#D61F1F] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in"
          onClick={() => setActive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-[#111] w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8 lg:p-12 relative">
              <button
                onClick={() => setActive(null)}
                className="absolute top-6 right-6 p-2 hover:bg-black/5"
              >
                <X size={20} />
              </button>
              {(() => {
                const p = practiceAreas[active];
                const Icon = p.icon;
                return (
                  <>
                    <Icon size={40} strokeWidth={1.2} className="text-[#D61F1F] mb-6" />
                    <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F]">
                      Practice Area
                    </span>
                    <h3 className="font-serif text-4xl mt-3 mb-6 font-medium">{p.title}</h3>
                    <p className="text-[#2A2A2A] text-lg font-light leading-relaxed mb-8">
                      {p.desc}
                    </p>
                    <div className="border-t border-black/10 pt-6">
                      <div className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] mb-4">
                        Sectors We Serve
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {p.sectors.map((s) => (
                          <div key={s} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[#D61F1F]" />
                            <span className="text-[#111]">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActive(null);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-10 inline-flex items-center gap-3 bg-[#D61F1F] hover:bg-[#b51919] text-white px-7 py-4 text-[12px] tracking-[0.24em] uppercase font-medium transition-colors"
                    >
                      Speak to a Partner
                      <ArrowUpRight size={16} />
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PracticeAreas;
