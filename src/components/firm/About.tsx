import React from 'react';
import { timeline, recognitions } from './data';
import { Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Intro */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#D61F1F]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                The Firm
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.1] text-[#111] font-medium">
              Three decades<br />of strategic<br />legal counsel.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-[#2A2A2A] text-lg font-light leading-relaxed">
            <p>
              Founded in 1995, <strong className="font-medium text-[#111]">Amie Bensouda &amp; Co — Corporate
              Legal Services LP</strong> is widely recognised as one of The Gambia's
              most prestigious and internationally connected full-service law firms.
            </p>
            <p>
              From our offices in Banjul, we advise governments, multinational corporations,
              international financial institutions, sovereign wealth funds, and private
              investors on the most complex transactions and disputes in The Gambia and
              the wider West African region.
            </p>
            <p>
              Our reputation rests on three principles: technical excellence, commercial
              judgement, and unwavering integrity. We measure success by the long-term
              relationships we build with the institutions that place their trust in us.
            </p>
          </div>
        </div>

        {/* Image strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          <div className="md:col-span-2 aspect-[16/9] overflow-hidden">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335579406_827fcfb7.png"
              alt="Modern law firm interior"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="aspect-[16/9] md:aspect-auto overflow-hidden">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335548315_67d5e8a0.jpg"
              alt="Law library"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
              Our Journey
            </span>
            <h3 className="font-serif text-4xl lg:text-5xl mt-4 text-[#111] font-medium">
              A legacy built milestone by milestone
            </h3>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2" />
            <div className="space-y-10 lg:space-y-0">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                    i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                  }`}
                >
                  <div className={`${i % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16'} relative`}>
                    <div className="font-serif text-5xl lg:text-6xl text-[#D61F1F] font-medium">
                      {t.year}
                    </div>
                    <h4 className="font-serif text-2xl mt-2 text-[#111]">{t.title}</h4>
                    <p className="text-[#2A2A2A] mt-3 font-light leading-relaxed">{t.desc}</p>
                  </div>
                  <div className="hidden lg:flex justify-center relative py-12">
                    <div className="w-4 h-4 rounded-full bg-[#D61F1F] ring-8 ring-white relative z-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recognitions */}
        <div className="bg-[#EDEDED] p-10 lg:p-16">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <Award className="text-[#D61F1F] mb-4" size={36} strokeWidth={1.2} />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                Awards & Recognitions
              </span>
              <h3 className="font-serif text-3xl lg:text-4xl mt-3 text-[#111] font-medium">
                Recognised by the world's leading legal directories.
              </h3>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {recognitions.map((r, i) => (
                <div key={i} className="flex gap-4 border-t border-black/10 pt-5">
                  <span className="font-serif text-[#D61F1F] text-lg">0{i + 1}</span>
                  <span className="text-[#111] font-light">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
