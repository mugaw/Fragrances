import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from '@/context/CartContext';
import { Navigation } from '@/components/Navigation';
import { CartDrawer } from '@/components/CartDrawer';
import { HeroSection } from '@/sections/HeroSection';
import { ProductFeatureSection } from '@/sections/ProductFeatureSection';
import { CompleteLineSection } from '@/sections/CompleteLineSection';
import { EditorialPortraitSection } from '@/sections/EditorialPortraitSection';
import { DetailStudySection } from '@/sections/DetailStudySection';
import { ScentFamiliesSection } from '@/sections/ScentFamiliesSection';
import { GiftingSection } from '@/sections/GiftingSection';
import { BoutiqueSection } from '@/sections/BoutiqueSection';
import { JournalSection } from '@/sections/JournalSection';
import { ContactSection } from '@/sections/ContactSection';
import { CollectionPage } from '@/pages/CollectionPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CraftPage } from '@/pages/CraftPage';
import { GiftingPage } from '@/pages/GiftingPage';
import { JournalPage } from '@/pages/JournalPage';
import { Footer } from '@/components/Footer';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  const snapTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (snapTriggerRef.current) {
        snapTriggerRef.current.kill();
      }
    };
  }, []);

  return (
    <main ref={mainRef} className="relative">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Noir Petal (right image) */}
      <ProductFeatureSection
        product={products[0]}
        index={1}
        layout="right"
      />

      {/* Section 3: Silhouette (left image) */}
      <ProductFeatureSection
        product={products[1]}
        index={2}
        layout="left"
      />

      {/* Section 4: Velvet Hour (right image) */}
      <ProductFeatureSection
        product={products[2]}
        index={3}
        layout="right"
      />

      {/* Section 5: Complete Line */}
      <CompleteLineSection />

      {/* Section 6: Editorial Portrait */}
      <EditorialPortraitSection />

      {/* Section 7: Detail Study */}
      <DetailStudySection />

      {/* Section 8: Scent Families (flowing) */}
      <ScentFamiliesSection />

      {/* Section 9: Gifting */}
      <GiftingSection />

      {/* Section 10: Boutique */}
      <BoutiqueSection />

      {/* Section 11: Journal */}
      <JournalSection />

      {/* Section 12: Contact (flowing) */}
      <ContactSection />
    </main>
  );
}

function App() {
  const location = useLocation();
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      // Cleanup all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative bg-luxury-black min-h-screen">
        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Cart Drawer */}
        <CartDrawer />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/craft" element={<CraftPage />} />
          <Route path="/gifting" element={<GiftingPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
