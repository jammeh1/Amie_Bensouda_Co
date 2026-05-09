import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name') as string,
      email: form.get('email') as string,
      company: form.get('company') as string,
      practice: form.get('practice') as string,
      message: form.get('message') as string,
    };

    try {
      await fetch('https://famous.ai/api/crm/69ff3e56a57d3eb9a2a6cc15/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          source: 'contact-form',
          tags: ['contact', 'inquiry', data.practice || 'general'],
        }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white">
      <div className="grid lg:grid-cols-2">
        {/* Left: Form */}
        <div className="p-8 lg:p-20 order-2 lg:order-1">
          <div className="max-w-xl mx-auto lg:mx-0 lg:ml-auto lg:mr-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#D61F1F]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D61F1F] font-medium">
                Get in Touch
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] text-[#111] font-medium mb-6">
              Request a confidential consultation.
            </h2>
            <p className="text-[#2A2A2A] font-light mb-10 leading-relaxed">
              Speak with our team about your matter. All inquiries are reviewed by a partner
              and treated with the strictest confidentiality.
            </p>

            {submitted ? (
              <div className="border border-black/10 p-10 text-center">
                <CheckCircle2 className="text-[#D61F1F] mx-auto mb-4" size={48} strokeWidth={1.2} />
                <h4 className="font-serif text-2xl text-[#111] mb-2">Thank you</h4>
                <p className="text-[#666]">A partner will respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    required
                    placeholder="Full name"
                    className="w-full bg-[#F7F7F7] border border-transparent px-4 py-4 text-sm focus:outline-none focus:border-[#D61F1F]"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full bg-[#F7F7F7] border border-transparent px-4 py-4 text-sm focus:outline-none focus:border-[#D61F1F]"
                  />
                </div>
                <input
                  name="company"
                  placeholder="Company / Organisation"
                  className="w-full bg-[#F7F7F7] border border-transparent px-4 py-4 text-sm focus:outline-none focus:border-[#D61F1F]"
                />
                <select
                  name="practice"
                  defaultValue=""
                  className="w-full bg-[#F7F7F7] border border-transparent px-4 py-4 text-sm focus:outline-none focus:border-[#D61F1F]"
                >
                  <option value="" disabled>Practice area of interest</option>
                  <option>Corporate &amp; Commercial</option>
                  <option>Banking &amp; Finance</option>
                  <option>Energy &amp; Infrastructure</option>
                  <option>Litigation &amp; Arbitration</option>
                  <option>Tax</option>
                  <option>Real Estate</option>
                  <option>Other</option>
                </select>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Briefly describe your matter"
                  className="w-full bg-[#F7F7F7] border border-transparent px-4 py-4 text-sm focus:outline-none focus:border-[#D61F1F] resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D61F1F] hover:bg-[#b51919] disabled:opacity-60 text-white py-4 text-[12px] tracking-[0.24em] uppercase font-medium transition-colors"
                >
                  {loading ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Info / Map */}
        <div className="bg-[#111] text-white p-8 lg:p-20 order-1 lg:order-2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335531854_785c4608.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative max-w-xl">
            <h3 className="font-serif text-3xl lg:text-4xl mb-10 font-medium">Banjul Office</h3>

            <div className="space-y-7">
              <div className="flex gap-4">
                <MapPin className="text-[#D61F1F] mt-1 shrink-0" size={22} strokeWidth={1.4} />
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1.5">Address</div>
                  <p className="text-white/90 leading-relaxed">
                    61 Hagan Street<br />Banjul, The Gambia
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-[#D61F1F] mt-1 shrink-0" size={22} strokeWidth={1.4} />
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1.5">Telephone</div>
                  <p className="text-white/90">+220 422 7805</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="text-[#D61F1F] mt-1 shrink-0" size={22} strokeWidth={1.4} />
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1.5">Email</div>
                  <p className="text-white/90">info@bensoudaco.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-[#D61F1F] mt-1 shrink-0" size={22} strokeWidth={1.4} />
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1.5">Hours</div>
                  <p className="text-white/90">Mon — Fri · 8:30 to 17:30 GMT</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-10">
              <a
                href="https://wa.me/2204227805"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 border border-white/20 hover:bg-white hover:text-[#111] text-[11px] tracking-[0.2em] uppercase transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#D61F1F] hover:bg-[#b51919] text-[11px] tracking-[0.2em] uppercase transition-colors"
              >
                <Calendar size={14} /> Schedule
              </a>
            </div>

            <div className="mt-10 aspect-[16/10] overflow-hidden border border-white/10">
              <iframe
                title="Office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-16.585%2C13.450%2C-16.560%2C13.465&layer=mapnik&marker=13.4574%2C-16.578"
                className="w-full h-full grayscale"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
