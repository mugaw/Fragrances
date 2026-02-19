import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Heart } from 'lucide-react';

export function Footer() {
  const heartRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (heartRef.current) {
      // Realistic heartbeat: "Lub-dub" - two pulses and then a pause
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(heartRef.current, {
        scale: 1.3,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(heartRef.current, {
        scale: 1,
        duration: 0.1,
        ease: "power2.in"
      })
      .to(heartRef.current, {
        scale: 1.2,
        duration: 0.1,
        ease: "power2.out",
        delay: 0.05
      })
      .to(heartRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.in"
      })
      .to({}, { duration: 0.8 }); // The pause between heartbeats
    }
  }, []);

  return (
    <footer className="w-full py-8 border-t border-luxury-ivory/10 bg-luxury-black/80 backdrop-blur-md">
      <div className="container mx-auto px-6 text-center">
        <p className="text-eyebrow text-luxury-gray text-[10px] md:text-xs">
          All rights reserved to the innovative creator{' '}
          <span className="text-luxury-gold font-medium">MuGaw</span>. 
          made with{' '}
          <span ref={heartRef} className="inline-block text-[#E31C25] mx-1">
            <Heart className="w-3 h-3 md:w-4 md:h-4 fill-current" />
          </span>
        </p>
      </div>
    </footer>
  );
}
