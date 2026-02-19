import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function DetailStudySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
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
      // Background entrance
      scrollTl.fromTo(
        bgRef.current,
        { x: '8vw', scale: 1.06, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
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
      // Background exit
      scrollTl.fromTo(
        bgRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-6vw', scale: 1.04, opacity: 0, ease: 'power2.in' },
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
      className="section-pinned z-[70]"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <img
          src="/images/macro_bottle_detail.jpg"
          alt="Bottle detail"
          className="w-full h-full object-cover"
        />
        {/* Vignette */}
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Text Block */}
      <div
        ref={textRef}
        className="absolute top-1/2 left-[7vw] -translate-y-1/2 z-[6] w-[36vw] max-w-lg"
      >
        <p className="text-eyebrow text-luxury-gold mb-4">
          Detail Study
        </p>
        <h2 className="text-section text-luxury-ivory mb-6">
          The Finish
        </h2>
        <p className="text-body text-luxury-gray mb-8">
          Glass weight. Label texture. Cap resonance. Details you feel before
          you name them.
        </p>
        <Link to="/craft" className="btn-primary">
          See the making
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
