import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scentFamilies } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export function ScentFamiliesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.scent-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1,
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-luxury-charcoal py-20 lg:py-32 z-[80]"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-section text-luxury-ivory mb-4">
            Scent Families
          </h2>
          <p className="text-body text-luxury-gray max-w-md mx-auto">
            Choose a path. We'll recommend a fragrance.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {scentFamilies.map((family) => (
            <Link
              key={family.id}
              to={`/collection?family=${family.id}`}
              className="scent-card group relative overflow-hidden bg-luxury-black/50 border border-luxury-ivory/10 transition-all duration-500 hover:-translate-y-1.5 hover:border-luxury-gold/35"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={family.image}
                  alt={family.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl text-luxury-ivory uppercase tracking-wider mb-2 group-hover:text-luxury-gold transition-colors">
                  {family.name}
                </h3>
                <p className="text-body text-luxury-gray mb-4">
                  {family.description}
                </p>
                <span className="text-eyebrow text-luxury-gold">
                  Explore
                </span>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 shadow-glow" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
