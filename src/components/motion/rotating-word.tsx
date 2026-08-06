import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion/gsap";
import { useEffect, useState } from "react";

interface RotatingWordProps {
  words: string[];
  /** ms each word stays visible */
  interval?: number;
  className?: string;
}

/**
 * Accessible, layout-shift-free word loop.
 *
 * All words are rendered stacked in a single grid cell, so the container is
 * always as wide as the longest word — nothing reflows as the copy changes.
 * Only the active word is exposed to assistive tech; the rest are hidden.
 * Honours `prefers-reduced-motion` by rendering the first word statically.
 */
export const RotatingWord = ({ words, interval = 2200, className }: RotatingWordProps) => {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const still = prefersReducedMotion();
    setReduced(still);
    if (still || words.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, words.length]);

  return (
    <span className={cn("relative inline-grid align-bottom overflow-hidden", className)}>
      {words.map((word, i) => {
        const active = reduced ? i === 0 : i === index;
        return (
          <span
            key={word}
            aria-hidden={!active}
            className={cn(
              "col-start-1 row-start-1 block whitespace-nowrap will-change-transform",
              reduced
                ? undefined
                : "transition-[opacity,transform,filter] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              active
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-[0.5em] blur-[6px]",
            )}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

export default RotatingWord;
