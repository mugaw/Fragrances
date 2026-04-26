import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useCart } from '@/context/CartContext';
import { Gift, Package, Sparkles, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const giftSets = [
  {
    id: 'discovery-set',
    name: 'Discovery Set',
    description: 'Three 15ml vials of our signature fragrances. The perfect introduction.',
    price: 145,
    includes: ['Noir Petal', 'Silhouette', 'Velvet Hour'],
    icon: Sparkles,
  },
  {
    id: 'signature-duo',
    name: 'Signature Duo',
    description: 'Two full-size fragrances of your choice, presented in a handcrafted box.',
    price: 520,
    includes: ['Choose any two fragrances'],
    icon: Gift,
  },
  {
    id: 'complete-collection',
    name: 'Complete Collection',
    description: 'All three signature fragrances in full size, with exclusive packaging.',
    price: 780,
    includes: ['Noir Petal', 'Silhouette', 'Velvet Hour', 'Limited edition case'],
    icon: Package,
  },
];

const occasions = [
  { name: 'Anniversary', recommendation: 'Velvet Hour' },
  { name: 'Birthday', recommendation: 'Noir Petal' },
  { name: 'Thank You', recommendation: 'Silhouette' },
  { name: 'Just Because', recommendation: 'Discovery Set' },
];

export function GiftingPage() {
  const { addItem } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);
  const setsRef = useRef<HTMLDivElement>(null);
  const occasionsRef = useRef<HTMLDivElement>(null);

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

    // Gift sets animation
    const sets = setsRef.current?.querySelectorAll('.gift-set');
    if (sets) {
      sets.forEach((set) => {
        gsap.fromTo(
          set,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: set,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            },
          }
        );
      });
    }

    // Occasions animation
    gsap.fromTo(
      occasionsRef.current?.querySelectorAll('.occasion-item') || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: occasionsRef.current,
          start: 'top 80%',
          end: 'top 60%',
          scrub: 1,
        },
      }
    );
  }, []);

  const handleAddGiftSet = (set: typeof giftSets[0]) => {
    // Add a placeholder product for the gift set
    const giftProduct = {
      id: set.id,
      name: set.name,
      subtitle: 'Gift Set',
      description: set.description,
      price: set.price,
      size: 'Set',
      image: '/images/gift_box.jpg',
      family: 'floral' as const,
      notes: { top: [], heart: [], base: [] },
      concentration: 'eau_de_parfum' as const,
    };
    addItem(giftProduct);
  };

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/gift_box.jpg"
            alt="Gift box"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-luxury-black/70" />
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="animate-item text-eyebrow text-luxury-gold mb-4">
            The Art of Giving
          </p>
          <h1 className="animate-item font-serif text-5xl lg:text-7xl text-luxury-ivory uppercase tracking-wider mb-6">
            Gifting
          </h1>
          <p className="animate-item text-body text-luxury-gray max-w-xl mx-auto">
            Hand-finished packaging, ribboned and sealed. Because the first
            impression should last.
          </p>
        </div>
      </div>

      {/* Gift Sets */}
      <div ref={setsRef} className="py-20 lg:py-32 px-6 lg:px-[7vw]">
        <h2 className="font-serif text-3xl text-luxury-ivory uppercase tracking-wider mb-12 text-center">
          Curated Sets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {giftSets.map((set) => {
            const Icon = set.icon;
            return (
              <div
                key={set.id}
                className="gift-set bg-luxury-charcoal/50 border border-luxury-ivory/10 p-8 transition-all duration-500 hover:border-luxury-gold/35 group"
              >
                <div className="w-12 h-12 mb-6 flex items-center justify-center border border-luxury-gold/50 text-luxury-gold">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-2xl text-luxury-ivory uppercase tracking-wider mb-4 group-hover:text-luxury-gold transition-colors">
                  {set.name}
                </h3>

                <p className="text-body text-luxury-gray mb-6">
                  {set.description}
                </p>

                <div className="mb-6">
                  <p className="text-eyebrow text-luxury-gray mb-2">
                    Includes:
                  </p>
                  <ul className="space-y-1">
                    {set.includes.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-luxury-ivory"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-luxury-ivory/10">
                  <span className="font-serif text-2xl text-luxury-ivory">
                    ${set.price}
                  </span>
                  <button
                    onClick={() => handleAddGiftSet(set)}
                    className="w-10 h-10 flex items-center justify-center border border-luxury-ivory/20 text-luxury-ivory hover:border-luxury-gold hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Packaging */}
      <div className="py-20 lg:py-32 px-6 lg:px-[7vw] bg-luxury-charcoal/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="font-serif text-3xl text-luxury-ivory uppercase tracking-wider mb-6">
              The Packaging
            </h2>
            <p className="text-body text-luxury-gray mb-6">
              Each gift is wrapped in our signature black paper, sealed with
              gold wax, and tied with silk ribbon. Inside, tissue paper cradles
              the fragrance, and a handwritten card carries your message.
            </p>
            <p className="text-body text-luxury-gray">
              We believe the unboxing should be as memorable as the scent
              itself.
            </p>
          </div>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src="/images/lineup_three_bottles.jpg"
              alt="Packaging"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Occasion Guide */}
      <div ref={occasionsRef} className="py-20 lg:py-32 px-6 lg:px-[7vw]">
        <h2 className="font-serif text-3xl text-luxury-ivory uppercase tracking-wider mb-12 text-center">
          Gift by Occasion
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occasion) => (
            <div
              key={occasion.name}
              className="occasion-item text-center p-6 border border-luxury-ivory/10 transition-all duration-300 hover:border-luxury-gold/35"
            >
              <p className="font-serif text-xl text-luxury-ivory uppercase tracking-wider mb-2">
                {occasion.name}
              </p>
              <p className="text-eyebrow text-luxury-gold">
                {occasion.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
