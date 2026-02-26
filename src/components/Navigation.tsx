import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'Collection', href: '/collection' },
  { label: 'Craft', href: '/craft' },
  { label: 'Gifting', href: '/gifting' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-luxury-black/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-xl tracking-[0.2em] text-luxury-ivory uppercase">
            L'Essence
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-eyebrow transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-luxury-gold'
                    : 'text-luxury-gray hover:text-luxury-ivory'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleCart}
              className="relative text-luxury-ivory hover:text-luxury-gold transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-luxury-gold text-luxury-black text-[10px] font-medium flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-luxury-ivory"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-luxury-black/95 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-luxury-charcoal transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-luxury-ivory"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            <div className="mt-16 flex flex-col gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl text-luxury-ivory uppercase tracking-wider hover:text-luxury-gold transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="absolute bottom-8 left-6 right-6">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full"
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
