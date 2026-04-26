import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ProductFeatureSectionProps {
  product: Product;
  index: number;
  layout: 'left' | 'right';
}

export function ProductFeatureSection({
  product,
  index,
  layout,
}: ProductFeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  const zIndex = 20 + index;

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
      // Image entrance
      const imageStartX = layout === 'right' ? '55vw' : '-55vw';
      scrollTl.fromTo(
        imageRef.current,
        { x: imageStartX, scale: 0.92, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Text entrance
      const textStartX = layout === 'right' ? '-40vw' : '40vw';
      scrollTl.fromTo(
        textRef.current,
        { x: textStartX, opacity: 0 },
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

      // Gradient entrance
      scrollTl.fromTo(
        gradientRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0
      );

      // SETTLE (30-70%): Hold - elements stay in place

      // EXIT (70-100%)
      // Image exit
      const imageEndX = layout === 'right' ? '-18vw' : '18vw';
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: imageEndX, y: '6vh', scale: 0.96, opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.to(imageRef.current, { opacity: 0, ease: 'power2.in' }, 0.95);

      // Text exit
      const textEndX = layout === 'right' ? '-14vw' : '14vw';
      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: textEndX, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Rule exit
      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 1 },
        { scaleX: 0, ease: 'power2.in' },
        0.7
      );

      // Gradient exit
      scrollTl.fromTo(
        gradientRef.current,
        { opacity: 1 },
        { opacity: 0.4, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, [layout]);

  const isRight = layout === 'right';

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-luxury-black"
      style={{ zIndex }}
    >
      {/* Background Spot Gradient */}
      <div
        ref={gradientRef}
        className={`absolute inset-0 z-[1] bg-spot-gradient opacity-0 ${
          isRight ? 'bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,164,92,0.08)_0%,transparent_60%)]' : 'bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,164,92,0.08)_0%,transparent_60%)]'
        }`}
      />

      {/* Product Image */}
      <div
        ref={imageRef}
        className={`absolute top-1/2 -translate-y-1/2 z-[4] will-change-transform ${
          isRight ? 'right-[6vw] w-[44vw]' : 'left-[6vw] w-[46vw]'
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain max-h-[70vh]"
        />
      </div>

      {/* Text Block */}
      <div
        ref={textRef}
        className={`absolute top-1/2 -translate-y-1/2 z-[6] px-6 lg:px-0 ${
          isRight
            ? 'left-[7vw] w-[34vw]'
            : 'right-[7vw] w-[34vw] text-right'
        }`}
      >
        <p className="text-eyebrow text-luxury-gold mb-4">
          {product.subtitle}
        </p>
        <h2 className="text-section text-luxury-ivory mb-6">
          {product.name}
        </h2>
        <p className="text-body text-luxury-gray mb-8">
          {product.description}
        </p>
        <Link
          to={`/product/${product.id}`}
          className={isRight ? 'btn-primary' : 'btn-primary ml-auto'}
        >
          Discover the notes
        </Link>
      </div>

      {/* Hairline Rule */}
      <div
        ref={ruleRef}
        className={`absolute top-[62vh] h-[1px] bg-luxury-ivory/35 z-[6] ${
          isRight
            ? 'left-[7vw] w-[8vw] origin-left'
            : 'right-[7vw] w-[8vw] origin-right'
        }`}
        style={{ transform: 'scaleX(0)' }}
      />
    </section>
  );
}
