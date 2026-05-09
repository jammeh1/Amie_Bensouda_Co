import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <a
      href="https://wa.me/2204227805"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#D61F1F] animate-ping opacity-30" />
      <div className="relative flex items-center gap-3 bg-[#D61F1F] hover:bg-[#b51919] text-white pl-4 pr-5 py-3.5 shadow-2xl transition-all">
        <MessageCircle size={20} />
        <span className="hidden sm:inline text-[11px] tracking-[0.2em] uppercase font-medium">
          Consultation
        </span>
      </div>
    </a>
  );
};

export default StickyCTA;
