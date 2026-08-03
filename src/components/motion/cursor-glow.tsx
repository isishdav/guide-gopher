import { useEffect, useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion/gsap";

/**
 * Barely-there gold spotlight that trails the cursor. Fine-pointer only,
 * pointer-events-none, and driven by two quickTo tweens (no re-renders).
 */
export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setActive(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: EASE.micro });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: EASE.micro });

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };
    const onEnter = () => gsap.to(el, { opacity: 1, duration: 0.6 });
    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.4 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerenter", onEnter);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-glow"
    />
  );
};

export default CursorGlow;
