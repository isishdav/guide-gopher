import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion/gsap";

interface CounterProps {
  /** Accepts formatted values such as "4,800+", "98%", "15". */
  value: string;
  className?: string;
  duration?: number;
}

const parse = (raw: string) => {
  const match = raw.match(/-?[\d.,]+/);
  if (!match) return null;
  const numeric = Number(match[0].replace(/,/g, ""));
  if (Number.isNaN(numeric)) return null;
  return {
    numeric,
    prefix: raw.slice(0, match.index ?? 0),
    suffix: raw.slice((match.index ?? 0) + match[0].length),
    grouped: match[0].includes(","),
  };
};

/** Smooth scroll-triggered count-up that degrades to the static value. */
export const Counter = ({ value, className, duration = 2 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parsed = parse(value);
    if (!parsed || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const state = { n: 0 };
      const format = (n: number) => {
        const rounded = Math.round(n);
        return parsed.grouped ? rounded.toLocaleString("en-US") : String(rounded);
      };
      el.textContent = `${parsed.prefix}${format(0)}${parsed.suffix}`;
      gsap.to(state, {
        n: parsed.numeric,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${parsed.prefix}${format(state.n)}${parsed.suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      el.textContent = value;
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
};
