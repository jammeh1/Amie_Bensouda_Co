import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="top" className="relative h-screen min-h-[720px] w-full overflow-hidden text-white">
      <div className="absolute inset-0">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335439147_9047c162.png"
          alt="Premium corporate law firm interior"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 h-full flex flex-col justify-center">
        <div className="max-w-3xl fade-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#D61F1F]" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-white/80">
              Established 1995 · Banjul, The Gambia
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] font-medium text-balance">
            Leading Corporate
            <br />
            Legal Excellence
            <br />
            in <span className="italic text-[#D61F1F]">The Gambia</span>.
          </h1>

          <p className="mt-8 text-base sm:text-lg text-white/80 max-w-2xl font-light leading-relaxed">
            Trusted by international investors, financial institutions, corporations,
            and governments since 1995. Three decades of strategic counsel at the highest level.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('practice')}
              className="group inline-flex items-center justify-center gap-3 bg-[#D61F1F] hover:bg-[#b51919] px-8 py-5 text-[12px] tracking-[0.24em] uppercase font-medium transition-all"
            >
              Explore Practice Areas
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center justify-center gap-3 border border-white/40 hover:border-white px-8 py-5 text-[12px] tracking-[0.24em] uppercase font-medium transition-all hover:bg-white hover:text-[#111]"
            >
              Speak With Our Team
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 lg:left-10 right-6 lg:right-10 flex items-end justify-between">
          <div className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white/60">
            <ChevronDown size={14} className="animate-bounce" />
            <span>Scroll to explore</span>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-2">
              Recognitions
            </div>
            <div className="flex gap-6 text-[11px] tracking-[0.2em] uppercase text-white/80">
              <span>Chambers Global</span>
              <span className="text-[#D61F1F]">·</span>
              <span>IFLR1000</span>
              <span className="text-[#D61F1F]">·</span>
              <span>Legal 500</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
