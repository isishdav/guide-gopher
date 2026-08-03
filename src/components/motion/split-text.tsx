import { useLayoutEffect, useRef } from "react";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { waitForIntro } from "@/lib/motion/intro";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words on the same visual line reveal together — reads as a line reveal. */
  mode?: "lines" | "words";
  delay?: number;
  /** Play on mount (hero) instead of on scroll. */
  immediate?: boolean;
  /** Wait for the cinematic loader before playing. */
  afterIntro?: boolean;
  id?: string;
}

/**
 * Accessible split-text reveal: the readable string stays in a visually hidden
 * node for screen readers, the animated copy is aria-hidden.
 */
export const SplitText = ({
  text,
  as: Tag = "span",
  className,
  mode = "lines",
  delay = 0,
  immediate = false,
  afterIntro = false,
  id,
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll("[data-split-inner]"), { yPercent: 0, opacity: 1 });
      return;
    }

    let cancelled = false;
    const ctx = gsap.context(() => {
      const inners = gsap.utils.toArray<HTMLElement>("[data-split-inner]", el);
      if (!inners.length) return;
      gsap.set(inners, { yPercent: 115, opacity: 0 });

      // Group by vertical offset so each visual line shares a start time.
      const rows = new Map<number, HTMLElement[]>();
      inners.forEach((inner) => {
        const key = mode === "words" ? inners.indexOf(inner) : Math.round(inner.offsetTop / 4);
        const bucket = rows.get(key) ?? [];
        bucket.push(inner);
        rows.set(key, bucket);
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1.05, ease: EASE.cinematic },
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
      });

      [...rows.values()].forEach((group, index) => {
        tl.to(group, { yPercent: 0, opacity: 1 }, delay + index * 0.11);
      });

      if (afterIntro) {
        waitForIntro().then(() => {
          if (!cancelled) tl.play();
        });
      } else {
        tl.play();
      }
    }, el);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [text, mode, delay, immediate, afterIntro]);

  return (
    <Tag ref={ref as never} className={className} id={id}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          >
            <span data-split-inner className={cn("inline-block will-change-transform")}>
              {word}
              {"\u00A0"}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
};
