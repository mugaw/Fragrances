import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Plus, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;

    // Image reveal animation
    gsap.fromTo(
      imageRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3,
      }
    );

    // Notes pyramid animation
    const noteSections = notesRef.current?.querySelectorAll('.note-section');
    if (noteSections) {
      noteSections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            },
          }
        );
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-luxury-ivory mb-4">
            Product Not Found
          </h1>
          <Link to="/collection" className="btn-primary">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const otherProducts = products.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen bg-luxury-black pt-24 pb-20">
      {/* Back Button */}
      <div className="px-6 lg:px-[7vw] mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-luxury-gray hover:text-luxury-ivory transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-eyebrow">Back</span>
        </button>
      </div>

      {/* Product Hero */}
      <div className="px-6 lg:px-[7vw] mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div
            ref={imageRef}
            className="aspect-[3/4] bg-luxury-charcoal/50 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <p className="text-eyebrow text-luxury-gold mb-4">
              {product.subtitle}
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl text-luxury-ivory uppercase tracking-wider mb-6">
              {product.name}
            </h1>
            <p className="text-body text-luxury-gray mb-8">
              {product.description}
            </p>

            <div className="flex items-center gap-6 mb-8">
              <span className="font-serif text-3xl text-luxury-ivory">
                ${product.price}
              </span>
              <span className="text-luxury-gray">{product.size}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex items-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add to cart
                  </>
                )}
              </button>
              <Link to="/collection" className="btn-secondary">
                View collection
              </Link>
            </div>

            <div className="pt-8 border-t border-luxury-ivory/10">
              <p className="text-eyebrow text-luxury-gray mb-2">
                Concentration
              </p>
              <p className="text-luxury-ivory capitalize">
                {product.concentration.replace(/_/g, ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Pyramid */}
      <div ref={notesRef} className="px-6 lg:px-[7vw] mb-20">
        <h2 className="font-serif text-3xl text-luxury-ivory uppercase tracking-wider mb-12 text-center">
          The Notes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Top Notes */}
          <div className="note-section text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-luxury-gold/50 flex items-center justify-center">
              <span className="text-luxury-gold font-serif text-lg">T</span>
            </div>
            <h3 className="font-serif text-xl text-luxury-ivory uppercase tracking-wider mb-4">
              Top Notes
            </h3>
            <p className="text-luxury-gray">
              {product.notes.top.join(', ')}
            </p>
          </div>

          {/* Heart Notes */}
          <div className="note-section text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-luxury-gold flex items-center justify-center">
              <span className="text-luxury-gold font-serif text-xl">H</span>
            </div>
            <h3 className="font-serif text-xl text-luxury-ivory uppercase tracking-wider mb-4">
              Heart Notes
            </h3>
            <p className="text-luxury-gray">
              {product.notes.heart.join(', ')}
            </p>
          </div>

          {/* Base Notes */}
          <div className="note-section text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-luxury-gold/50 flex items-center justify-center">
              <span className="text-luxury-gold font-serif text-lg">B</span>
            </div>
            <h3 className="font-serif text-xl text-luxury-ivory uppercase tracking-wider mb-4">
              Base Notes
            </h3>
            <p className="text-luxury-gray">
              {product.notes.base.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Other Products */}
      <div className="px-6 lg:px-[7vw]">
        <h2 className="font-serif text-2xl text-luxury-ivory uppercase tracking-wider mb-8">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProducts.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="group flex gap-6 bg-luxury-charcoal/50 border border-luxury-ivory/10 p-4 transition-all duration-500 hover:border-luxury-gold/35"
            >
              <div className="w-32 h-40 flex-shrink-0 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-eyebrow text-luxury-gold mb-2">
                  {p.subtitle}
                </p>
                <h3 className="font-serif text-xl text-luxury-ivory uppercase tracking-wider group-hover:text-luxury-gold transition-colors">
                  {p.name}
                </h3>
                <p className="text-luxury-gray mt-2">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
