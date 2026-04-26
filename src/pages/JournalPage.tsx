import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Droplets, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 'how-to-wear',
    title: 'How to Wear Fragrance',
    excerpt:
      'The art of application: where to spray, how much to use, and why less is often more.',
    icon: Droplets,
    content: [
      'Pulse points are your allies. The warmth of wrists, neck, and behind the ears helps fragrance evolve throughout the day.',
      'Resist the urge to rub. Let the liquid settle naturally—rubbing breaks down the molecular structure and alters the scent.',
      'Consider your canvas. Moisturized skin holds fragrance longer than dry skin. Apply an unscented lotion before your perfume.',
      'Layer with intention. Use matching body products to extend the life of your fragrance without overwhelming.',
    ],
  },
  {
    id: 'how-to-store',
    title: 'How to Store Your Collection',
    excerpt:
      'Light, heat, and air are the enemies of perfume. Learn to protect your investment.',
    icon: Clock,
    content: [
      'Keep bottles in their original boxes. The packaging is designed to protect from light degradation.',
      'Avoid the bathroom. Humidity and temperature fluctuations from showers accelerate deterioration.',
      'Store upright. This minimizes the surface area of fragrance exposed to air in the bottle.',
      'Dark and cool is best. A drawer, closet, or dedicated perfume cabinet away from windows preserves potency.',
    ],
  },
  {
    id: 'seasonal-choices',
    title: 'Choosing for the Season',
    excerpt:
      'Why some scents feel right in summer and others in winter—and how to break the rules gracefully.',
    icon: Sun,
    content: [
      'Summer calls for lightness. Citrus, aquatic, and green notes bloom in heat without becoming cloying.',
      'Winter welcomes depth. Amber, vanilla, and woody notes provide warmth and projection in cold air.',
      'Transition with care. Spring and autumn are perfect for florals and soft spices that bridge the extremes.',
      'But rules are meant to be broken. Wear what makes you feel like yourself, regardless of the calendar.',
    ],
  },
];

export function JournalPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

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

    // Articles animation
    const articleCards = articlesRef.current?.querySelectorAll('.article-card');
    if (articleCards) {
      articleCards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
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
  }, []);

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/botanical_silhouette.png"
            alt="Botanical"
            className="w-full h-full object-contain opacity-10"
          />
          <div className="absolute inset-0 bg-luxury-black/80" />
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="animate-item text-eyebrow text-luxury-gold mb-4">
            Notes on Scent
          </p>
          <h1 className="animate-item font-serif text-5xl lg:text-7xl text-luxury-ivory uppercase tracking-wider mb-6">
            Journal
          </h1>
          <p className="animate-item text-body text-luxury-gray max-w-xl mx-auto">
            Thoughts on fragrance, craftsmanship, and the art of wearing scent.
          </p>
        </div>
      </div>

      {/* Articles */}
      <div ref={articlesRef} className="py-20 lg:py-32 px-6 lg:px-[7vw]">
        <div className="space-y-16 lg:space-y-24">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <article
                key={article.id}
                className={`article-card grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-12 h-12 mb-6 flex items-center justify-center border border-luxury-gold/50 text-luxury-gold">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h2 className="font-serif text-3xl lg:text-4xl text-luxury-ivory uppercase tracking-wider mb-4">
                    {article.title}
                  </h2>

                  <p className="text-body text-luxury-gray mb-8">
                    {article.excerpt}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {article.content.map((point, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full mt-2 flex-shrink-0" />
                        <p className="text-luxury-gray">{point}</p>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => alert('Full article coming soon.')}
                    className="text-eyebrow text-luxury-gold flex items-center gap-2 group"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Visual */}
                <div
                  className={`aspect-[4/3] bg-luxury-charcoal/50 border border-luxury-ivory/10 flex items-center justify-center ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-luxury-gold/30 text-luxury-gold/50">
                      <Icon className="w-10 h-10" />
                    </div>
                    <p className="text-eyebrow text-luxury-gray">
                      {article.title}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="py-20 lg:py-32 px-6 lg:px-[7vw] bg-luxury-charcoal/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-luxury-ivory uppercase tracking-wider mb-4">
            Stay Informed
          </h2>
          <p className="text-body text-luxury-gray mb-8">
            Subscribe to receive new journal entries, exclusive offers, and
            early access to limited releases.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing!');
            }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b border-luxury-ivory/20 py-3 text-luxury-ivory focus:border-luxury-gold focus:outline-none transition-colors text-center sm:text-left"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
