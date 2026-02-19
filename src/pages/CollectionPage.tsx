import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Plus, Filter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const families = [
  { id: 'all', name: 'All' },
  { id: 'floral', name: 'Floral' },
  { id: 'woody', name: 'Woody' },
  { id: 'oriental', name: 'Oriental' },
];

export function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('family') || 'all';
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addItem } = useCart();
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  }, []);

  useEffect(() => {
    // Grid items animation
    const items = gridRef.current?.querySelectorAll('.product-card');
    if (items) {
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [activeFilter]);

  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.family === activeFilter);

  const handleFilterChange = (familyId: string) => {
    if (familyId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ family: familyId });
    }
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-luxury-black pt-32 pb-20">
      <div className="px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <p className="text-eyebrow text-luxury-gold mb-4">
            The Collection
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h1 className="text-section text-luxury-ivory">
              Signature Fragrances
            </h1>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-luxury-ivory hover:text-luxury-gold transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-eyebrow">
                  Filter: {families.find((f) => f.id === activeFilter)?.name}
                </span>
              </button>

              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 bg-luxury-charcoal border border-luxury-ivory/10 py-2 min-w-[150px] z-10">
                  {families.map((family) => (
                    <button
                      key={family.id}
                      onClick={() => handleFilterChange(family.id)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        activeFilter === family.id
                          ? 'text-luxury-gold'
                          : 'text-luxury-gray hover:text-luxury-ivory'
                      }`}
                    >
                      {family.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-luxury-charcoal/50 border border-luxury-ivory/10 overflow-hidden transition-all duration-500 hover:border-luxury-gold/35"
            >
              {/* Image */}
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                <p className="text-eyebrow text-luxury-gold mb-2">
                  {product.subtitle}
                </p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-serif text-2xl text-luxury-ivory uppercase tracking-wider mb-2 group-hover:text-luxury-gold transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-body text-luxury-gray mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-luxury-ivory font-medium">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addItem(product)}
                    className="w-10 h-10 flex items-center justify-center border border-luxury-ivory/20 text-luxury-ivory hover:border-luxury-gold hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 shadow-glow" />
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-luxury-gray text-lg">
              No fragrances found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
