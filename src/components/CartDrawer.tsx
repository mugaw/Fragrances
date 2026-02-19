import { useEffect, useRef } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power3.out',
      });

      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.2,
          ease: 'power2.out',
        }
      );
    } else {
      document.body.style.overflow = '';
      
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
      });
      
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    alert('Thank you for your interest! Checkout coming soon.');
  };

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-luxury-black/80 backdrop-blur-sm opacity-0"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-luxury-charcoal translate-x-full"
      >
        <div ref={contentRef} className="h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-luxury-gold" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl text-luxury-ivory uppercase tracking-wider">
                Your Cart
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="text-luxury-gray hover:text-luxury-ivory transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-16 h-16 text-luxury-gray/30 mb-4" strokeWidth={1} />
              <p className="text-luxury-gray text-lg mb-2">Your cart is empty</p>
              <p className="text-luxury-gray/60 text-sm">
                Discover our collection of fine fragrances
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 pb-6 border-b border-luxury-ivory/10"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-eyebrow text-luxury-gold mb-1">
                            {item.product.subtitle}
                          </p>
                          <h3 className="font-serif text-lg text-luxury-ivory uppercase tracking-wide">
                            {item.product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-luxury-gray hover:text-luxury-ivory transition-colors"
                        >
                          <X className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-luxury-gray text-sm mb-3">
                        {item.product.size} / {item.product.concentration.replace(/_/g, ' ')}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center border border-luxury-ivory/20 text-luxury-ivory hover:border-luxury-gold hover:text-luxury-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-luxury-ivory w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center border border-luxury-ivory/20 text-luxury-ivory hover:border-luxury-gold hover:text-luxury-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-luxury-ivory font-medium">
                          ${item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-luxury-ivory/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-luxury-gray">Subtotal</span>
                  <span className="font-serif text-2xl text-luxury-ivory">
                    ${totalPrice}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full mb-3"
                >
                  Proceed to checkout
                </button>
                <button
                  onClick={closeCart}
                  className="btn-secondary w-full"
                >
                  Continue shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
