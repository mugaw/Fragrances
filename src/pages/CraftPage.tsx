import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const craftSections = [
  {
    title: 'The Philosophy',
    content:
      'Every fragrance begins with a question: What memory should this evoke? We compose not to overwhelm, but to accompany—to become an invisible signature that lingers in rooms after you\'ve left them.',
    image: '/images/hero_garden.jpg',
  },
  {
    title: 'Ingredient Sourcing',
    content:
      'We travel to the origins of scent: rose fields in Grasse, sandalwood forests in Mysore, vanilla orchids in Madagascar. Each ingredient is selected for its character, its story, and its ability to harmonize.',
    image: '/images/scent_floral.jpg',
  },
  {
    title: 'The Art of Blending',
    content:
      'Our perfumers work in small batches, layering notes like brushstrokes. A fragrance may undergo hundreds of iterations before the balance feels inevitable—like it always existed, waiting to be discovered.',
    image: '/images/macro_bottle_detail.jpg',
  },
  {
    title: 'Bottle Design',
    content:
      'The vessel matters. Each bottle is designed to catch light, to feel substantial in the hand, to deserve its place on a vanity. We collaborate with glass artisans to create forms that echo the fragrance within.',
    image: '/images/bottle_silhouette.jpg',
  },
];

export function CraftPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current?.querySelectorAll('.animate-item') || [],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      }
    );

    // Sections animation
    const sections = sectionsRef.current?.querySelectorAll('.craft-section');
    if (sections) {
      sections.forEach((section) => {
        const image = section.querySelector('.section-image');
        const text = section.querySelector('.section-text');

        gsap.fromTo(
          image,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          text,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/boutique_interior.jpg"
            alt="Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-luxury-black/70" />
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="animate-item text-eyebrow text-luxury-gold mb-4">
            Our Story
          </p>
          <h1 className="animate-item font-serif text-5xl lg:text-7xl text-luxury-ivory uppercase tracking-wider mb-6">
            The Atelier
          </h1>
          <p className="animate-item text-body text-luxury-gray max-w-xl mx-auto">
            Where intention meets intuition. Where every detail is considered.
            Where fragrance becomes art.
          </p>
        </div>
      </div>

      {/* Craft Sections */}
      <div ref={sectionsRef} className="py-20 lg:py-32">
        {craftSections.map((section, index) => (
          <div
            key={section.title}
            className={`craft-section px-6 lg:px-[7vw] py-16 lg:py-24 ${
              index !== craftSections.length - 1
                ? 'border-b border-luxury-ivory/10'
                : ''
            }`}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`section-image aspect-[4/3] overflow-hidden ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div
                className={`section-text ${
                  index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''
                }`}
              >
                <h2 className="font-serif text-3xl lg:text-4xl text-luxury-ivory uppercase tracking-wider mb-6">
                  {section.title}
                </h2>
                <p className="text-body text-luxury-gray leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="py-20 lg:py-32 px-6 lg:px-[7vw] bg-luxury-charcoal/30">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-2xl lg:text-3xl text-luxury-ivory italic mb-8">
            "A fragrance should not announce itself. It should be discovered—
            like a secret shared between the wearer and those close enough to
            notice."
          </blockquote>
          <p className="text-eyebrow text-luxury-gold">
            — Elena Voss, Master Perfumer
          </p>
        </div>
      </div>
    </div>
  );
}
