import type { gsap as GsapType } from "gsap";
import { EASE } from "./gsap";

export type RevealVariant =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "blur"
  | "mask-up"
  | "clip-right"
  | "clip-center";

type Tween = GsapType.TweenVars;

interface VariantDef {
  from: Tween;
  to: Tween;
}

/**
 * Reveal vocabulary. Only transform / opacity / filter / clip-path are animated
 * so nothing triggers layout.
 */
export const VARIANTS: Record<RevealVariant, VariantDef> = {
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 1, ease: EASE.luxe },
  },
  "fade-up": {
    from: { opacity: 0, y: 32 },
    to: { opacity: 1, y: 0, duration: 1, ease: EASE.luxe },
  },
  "fade-down": {
    from: { opacity: 0, y: -28 },
    to: { opacity: 1, y: 0, duration: 1, ease: EASE.luxe },
  },
  "slide-left": {
    from: { opacity: 0, x: 48 },
    to: { opacity: 1, x: 0, duration: 1.1, ease: EASE.cinematic },
  },
  "slide-right": {
    from: { opacity: 0, x: -48 },
    to: { opacity: 1, x: 0, duration: 1.1, ease: EASE.cinematic },
  },
  scale: {
    from: { opacity: 0, scale: 0.94 },
    to: { opacity: 1, scale: 1, duration: 1.1, ease: EASE.cinematic },
  },
  blur: {
    from: { opacity: 0, y: 22, filter: "blur(12px)" },
    to: { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: EASE.luxe },
  },
  "mask-up": {
    from: { yPercent: 110 },
    to: { yPercent: 0, duration: 1.2, ease: EASE.cinematic },
  },
  "clip-right": {
    from: { clipPath: "inset(0% 100% 0% 0%)", scale: 1.06 },
    to: { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.4, ease: EASE.fabric },
  },
  "clip-center": {
    from: { clipPath: "inset(0% 50% 0% 50%)" },
    to: { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE.fabric },
  },
};
