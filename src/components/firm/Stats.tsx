import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 30, suffix: '+', label: 'Years of Excellence', sub: 'Since 1995' },
  { value: 500, suffix: '+', label: 'International Clients', sub: 'Across 40+ jurisdictions' },
  { value: 11, suffix: '', label: 'Practice Areas', sub: 'Full-service firm' },
  { value: 25, suffix: '+', label: 'Attorneys & Staff', sub: 'Multi-disciplinary' },
];

const Counter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setCount(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-serif text-6xl lg:text-7xl font-medium tabular-nums">
      {count}
      <span className="text-[#D61F1F]">{suffix}</span>
    </span>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="bg-[#111111] text-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="border-l border-white/10 pl-6">
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-4 text-[12px] tracking-[0.24em] uppercase text-white/90 font-medium">
                {s.label}
              </div>
              <div className="text-[11px] tracking-wider text-white/50 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
