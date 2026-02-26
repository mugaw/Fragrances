import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftColRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      // Right column animation
      gsap.fromTo(
        rightColRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 80%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-luxury-black py-20 lg:py-32 z-[120]"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          {/* Left Column - Contact Form */}
          <div ref={leftColRef}>
            <h2 className="text-section text-luxury-ivory mb-4">
              Get in Touch
            </h2>
            <p className="text-body text-luxury-gray mb-8">
              Questions, appointments, or press inquiries—send a note.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-eyebrow text-luxury-gray block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-luxury-ivory/20 py-3 text-luxury-ivory focus:border-luxury-gold focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="text-eyebrow text-luxury-gray block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-luxury-ivory/20 py-3 text-luxury-ivory focus:border-luxury-gold focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="text-eyebrow text-luxury-gray block mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-luxury-ivory/20 py-3 text-luxury-ivory focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                  rows={4}
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary flex items-center gap-2"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>Message sent</>
                ) : (
                  <>
                    Send message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Newsletter & Links */}
          <div ref={rightColRef}>
            {/* Newsletter */}
            <div className="mb-12">
              <h3 className="font-serif text-2xl text-luxury-ivory uppercase tracking-wider mb-4">
                Join the List
              </h3>
              <p className="text-body text-luxury-gray mb-6">
                Be the first to know about new releases, limited editions, and
                exclusive events.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-transparent border-b border-luxury-ivory/20 py-3 text-luxury-ivory focus:border-luxury-gold focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 transition-colors"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    'Subscribed'
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-4">
              {['Shipping', 'Returns', 'Care', 'Privacy'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-link flex items-center gap-2 group"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${link} information coming soon.`);
                  }}
                >
                  <span className="w-1 h-1 bg-luxury-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="pt-8 border-t border-luxury-ivory/10 flex flex-col lg:flex-row items-center justify-between gap-4"
        >
          <p className="font-serif text-lg text-luxury-ivory tracking-[0.2em] uppercase">
            L'Essence
          </p>
          <p className="text-eyebrow text-luxury-gray">
            © L'Essence Parfumerie. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
