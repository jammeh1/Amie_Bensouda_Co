import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const links = [
  { label: 'About', id: 'about' },
  { label: 'Practice Areas', id: 'practice' },
  { label: 'Our Team', id: 'team' },
  { label: 'Insights', id: 'insights' },
  { label: 'International', id: 'international' },
  { label: 'Careers', id: 'careers' },
  { label: 'Contact', id: 'contact' },
];

interface NavigationProps {
  activeSection: string | null;
  onSectionChange: (id: string | null) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goHome = () => {
    setOpen(false);
    onSectionChange(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (id: string) => {
    setOpen(false);
    onSectionChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLight = !scrolled && !activeSection;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        !isLight ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20 lg:h-24">
        <button onClick={goHome} className="flex items-center">
          <Logo variant={isLight ? 'light' : 'dark'} />
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleLinkClick(l.id)}
              className={`red-underline text-[13px] tracking-[0.18em] uppercase font-medium transition-colors ${
                activeSection === l.id
                  ? 'text-[#D61F1F]'
                  : isLight
                  ? 'text-white hover:text-white'
                  : 'text-[#111] hover:text-[#D61F1F]'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('contact')}
            className="ml-2 px-5 py-3 bg-[#D61F1F] hover:bg-[#b51919] text-white text-[12px] tracking-[0.2em] uppercase font-medium transition-colors"
          >
            Consultation
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden ${isLight ? 'text-white' : 'text-[#111]'}`}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#111111] text-white border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            <button
              onClick={goHome}
              className="text-left text-sm tracking-[0.2em] uppercase hover:text-[#D61F1F]"
            >
              Home
            </button>
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleLinkClick(l.id)}
                className={`text-left text-sm tracking-[0.2em] uppercase hover:text-[#D61F1F] ${
                  activeSection === l.id ? 'text-[#D61F1F]' : ''
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleLinkClick('contact')}
              className="mt-2 px-5 py-3 bg-[#D61F1F] text-white text-xs tracking-[0.2em] uppercase font-medium"
            >
              Request Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
export { links };
