import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '' }) => {
  const text = variant === 'light' ? 'text-white' : 'text-[#111111]';
  const subtle = variant === 'light' ? 'text-white/70' : 'text-[#2A2A2A]';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-10 w-10 shrink-0">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#D61F1F] skew-x-[-12deg]" />
        <div className={`absolute inset-0 flex items-center justify-center font-serif text-2xl font-bold ${text}`}>
          AB
        </div>
      </div>
      <div className="leading-tight">
        <div className={`font-serif text-base sm:text-lg font-semibold tracking-wide ${text}`}>
          AMIE BENSOUDA <span className="text-[#D61F1F]">&amp;</span> CO
        </div>
        <div className={`text-[10px] sm:text-[11px] tracking-[0.22em] uppercase ${subtle}`}>
          Corporate Legal Services LP
        </div>
      </div>
    </div>
  );
};

export default Logo;
