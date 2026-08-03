import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";
import { ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/motion/gsap";

/**
 * Premium smooth scroll (Lenis) driven by GSAP's ticker so scroll-linked
 * animations stay in perfect sync with a single RAF loop.
 * Skipped entirely for reduced-motion users — native scrolling is preserved.
 */
export const SmoothScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      // Native momentum feels better than emulated smoothing on touch devices.
      syncTouch: false,
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Route changes replace the whole document flow — measurements must reset.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
};

export default SmoothScroll;
