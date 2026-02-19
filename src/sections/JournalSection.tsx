import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function JournalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const botanicalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Botanical silhouette entrance
      scrollTl.fromTo(
        botanicalRef.current,
        { opacity: 0, x: '6vw' },
        { opacity: 0.18, x: 0, ease: 'none' },
        0
      );

      // Text entrance
      scrollTl.fromTo(
        textRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Rule entrance
      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      // Botanical exit
      scrollTl.fromTo(
        botanicalRef.current,
        { opacity: 0.18 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Text exit
      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Rule exit
      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 1 },
        { scaleX: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-luxury-black z-[110]"
    >
      {/* Botanical Silhouette */}
      <div
        ref={botanicalRef}
        className="absolute right-[5vw] top-1/2 -translate-y-1/2 z-[1] opacity-0"
      >
        <img
          src="/images/botanical_silhouette.png"
          alt="Botanical silhouette"
          className="w-[30vw] max-w-md h-auto"
        />
      </div>

      {/* Text Block */}
      <div
        ref={textRef}
        className="absolute top-1/2 left-[7vw] -translate-y-1/2 z-[6] w-[38vw] max-w-lg"
      >
        <p className="text-eyebrow text-luxury-gold mb-4">
          Journal
        </p>
        <h2 className="text-section text-luxury-ivory mb-6">
          Notes on Scent
        </h2>
        <p className="text-body text-luxury-gray mb-8">
          How to wear fragrance. How to store it. How to choose for the
          season—without following rules.
        </p>
        <Link to="/journal" className="btn-primary">
          Read the journal
        </Link>
      </div>

      {/* Hairline Rule */}
      <div
        ref={ruleRef}
        className="absolute top-[62vh] left-[7vw] w-[8vw] h-[1px] bg-luxury-ivory/35 z-[6] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </section>
  );
}
