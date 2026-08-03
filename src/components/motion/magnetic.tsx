import { useLayoutEffect, useRef } from "react";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Pixels of pull at the edge of the element. */
  strength?: number;
}

/**
 * Cursor-magnetic wrapper using gsap.quickTo for a single interpolated tween
 * per axis. Disabled for touch pointers and reduced-motion users.
 */
export const Magnetic = ({ children, className, strength = 12 }: MagneticProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: EASE.micro });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: EASE.micro });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.4, ease: EASE.micro });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * strength * 2);
      yTo(relY * strength * 2);
    };
    const onEnter = () => scaleTo(1.03);
    const onLeave = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
};
