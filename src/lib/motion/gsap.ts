import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single GSAP entry point for the whole site.
 * Plugins are registered once, eases + timing live here so every
 * animation on the site shares one rhythm.
 */
if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

gsap.defaults({ ease: "power3.out", duration: 1 });

ScrollTrigger.config({ ignoreMobileResize: true });

/** Cinematic easing vocabulary — used everywhere instead of ad-hoc strings. */
export const EASE = {
  /** Default reveal — soft landing. */
  luxe: "power3.out",
  /** Long, expensive settle for hero / large media. */
  cinematic: "expo.out",
  /** Heavy fabric moving — used by the curtain panels. */
  fabric: "power4.inOut",
  /** Micro-interactions (hover, magnetic). */
  micro: "power2.out",
} as const;

export const DUR = {
  micro: 0.4,
  reveal: 1,
  hero: 1.4,
  curtain: 1.9,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobileViewport = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

/** Refresh ScrollTrigger once layout/media settles, batched into one frame. */
let refreshQueued = false;
export const refreshScrollTriggers = () => {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
};

export { gsap, ScrollTrigger };
