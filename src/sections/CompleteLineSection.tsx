import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export function CompleteLineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottlesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: '-18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Bottles entrance (stagger: center, left, right)
      const bottles = bottlesRef.current?.querySelectorAll('.bottle-card');
      if (bottles) {
        // Center bottle (index 1) first
        scrollTl.fromTo(
          bottles[1],
          { y: '60vh', scale: 0.88, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.05
        );
        // Left bottle (index 0)
        scrollTl.fromTo(
          bottles[0],
          { y: '60vh', scale: 0.88, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.08
        );
        // Right bottle (index 2)
        scrollTl.fromTo(
          bottles[2],
          { y: '60vh', scale: 0.88, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.11
        );
      }

      // CTA entrance
      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Bottles exit
      if (bottles) {
        scrollTl.fromTo(
          bottles,
          { y: 0, scale: 1, opacity: 1 },
          { y: '-22vh', scale: 0.95, opacity: 0.2, ease: 'power2.in', stagger: 0.02 },
          0.7
        );
        scrollTl.to(bottles, { opacity: 0, ease: 'power2.in', stagger: 0.02 }, 0.95);
      }

      // CTA exit
      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-luxury-black z-[50]"
    >
      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute top-[12vh] left-1/2 -translate-x-1/2 z-[6] text-center w-[70vw]"
      >
        <h2 className="text-section text-luxury-ivory mb-4">
          The Complete Line
        </h2>
        <p className="text-body text-luxury-gray max-w-xl mx-auto">
          Three statements. One philosophy. Select a fragrance to explore its story.
        </p>
      </div>

      {/* Bottles */}
      <div
        ref={bottlesRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] flex items-end justify-center gap-[3vw] w-[72vw]"
      >
        {products.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className={`bottle-card group flex flex-col items-center transition-all duration-500 ${
              index === 1 ? 'w-[24vw]' : 'w-[20vw]'
            }`}
          >
            <div className="relative overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/10 transition-colors duration-500" />
            </div>
            <p className="font-serif text-lg text-luxury-ivory uppercase tracking-wider group-hover:text-luxury-gold transition-colors">
              {product.name}
            </p>
            <p className="text-eyebrow text-luxury-gray mt-1">
              {product.subtitle}
            </p>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        className="absolute top-[82vh] left-1/2 -translate-x-1/2 z-[6]"
      >
        <Link to="/collection" className="btn-secondary">
          Compare all three
        </Link>
      </div>
    </section>
  );
}
