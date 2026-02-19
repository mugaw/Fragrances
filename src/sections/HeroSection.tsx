import { useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Micro label
      tl.fromTo(
        microLabelRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.6'
      );

      // Headline words
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        tl.fromTo(
          headlineWords,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 },
          '-=0.4'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([microLabelRef.current, subheadlineRef.current, ctaRef.current], {
              opacity: 1,
              x: 0,
            });
            const headlineWords = headlineRef.current?.querySelectorAll('.word');
            if (headlineWords) {
              gsap.set(headlineWords, { opacity: 1, x: 0 });
            }
            gsap.set(bgRef.current, { scale: 1, y: 0 });
            gsap.set(overlayRef.current, { x: '100%' });
          },
        },
      });

      // Phase 1 (0-30%): Hold (entrance already done by load animation)
      // Subtle background parallax
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.02, ease: 'none' },
        0
      );

      // Phase 3 (70-100%): Exit
      // Headline block exit
      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.to(
        contentRef.current,
        { opacity: 0, ease: 'power2.in' },
        0.95
      );

      // Background exit
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.02, y: 0 },
        { scale: 1.08, y: '-4vh', ease: 'none' },
        0.7
      );

      // Transition wipe
      scrollTl.fromTo(
        overlayRef.current,
        { x: '100%' },
        { x: '0%', ease: 'power2.inOut' },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-luxury-black z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <img
          src="/images/hero_garden.jpg"
          alt="Night garden"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />

      {/* Transition Wipe Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[5] bg-luxury-black translate-x-full"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-[6] flex flex-col justify-center px-6 lg:px-[7vw]"
      >
        {/* Micro Label */}
        <p
          ref={microLabelRef}
          className="text-eyebrow text-luxury-gold mb-8 lg:mb-12"
        >
          Parfumerie / Est. 2019
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-hero text-luxury-ivory max-w-[42vw] mb-6"
        >
          <span className="word inline-block">Sculpted</span>{' '}
          <span className="word inline-block">in</span>{' '}
          <span className="word inline-block">Light</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-body text-luxury-gray max-w-md mb-10"
        >
          A fragrance house where each scent is composed like a photograph—mood
          first, memory always.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <Link to="/collection" className="btn-primary">
            Explore the Collection
          </Link>
          <Link to="/craft" className="btn-secondary">
            Read our story
          </Link>
        </div>
      </div>

      {/* Bottom Right Credit */}
      <p className="absolute right-[6vw] bottom-[8vh] z-[6] text-eyebrow text-luxury-gray/60 hidden lg:block">
        Image: Night garden still life — warm cinematic grade
      </p>
    </section>
  );
}
