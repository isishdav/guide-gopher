import { useLayoutEffect, useRef } from "react";
import { DUR, gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { VARIANTS, type RevealVariant } from "@/lib/motion/variants";

export interface RevealOptions {
  variant?: RevealVariant;
  delay?: number;
  /** Stagger step for `[data-reveal-item]` descendants. */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
  once?: boolean;
  /** Skip the scroll trigger and play as soon as it mounts. */
  immediate?: boolean;
  enabled?: boolean;
}

/**
 * Scroll reveal built on one gsap.context() so every tween and ScrollTrigger
 * is reverted on unmount. Children marked `data-reveal-item` are staggered.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>({
  variant = "fade-up",
  delay = 0,
  stagger = 0.12,
  start = "top 85%",
  once = true,
  immediate = false,
  enabled = true,
}: RevealOptions = {}) => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]", el);
      const targets = items.length ? items : [el];
      const { from, to } = VARIANTS[variant];

      gsap.set(targets, from);
      gsap.to(targets, {
        ...to,
        delay,
        stagger: targets.length > 1 ? stagger : 0,
        duration: (to.duration as number) ?? DUR.reveal,
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start, once, invalidateOnRefresh: true },
      });
    }, el);

    return () => ctx.revert();
  }, [variant, delay, stagger, start, once, immediate, enabled]);

  return ref;
};
