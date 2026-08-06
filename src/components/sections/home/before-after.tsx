import Container from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { useLayoutEffect, useRef } from "react";

const BEFORE = "/images/curtains/before-room.jpg";
const AFTER = "/images/curtains/after-room.jpg";

/**
 * Signature before / after showcase. The "after" image is revealed with a
 * clip-path wipe driven by scroll, and can be explored with a draggable
 * (and keyboard-accessible) divider.
 */
const BeforeAfter = () => {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    const frameEl = frame.current;
    if (!el || !frameEl) return;

    const setSplit = (value: number) => {
      const clamped = Math.min(100, Math.max(0, value));
      frameEl.style.setProperty("--split", `${clamped}%`);
    };

    if (prefersReducedMotion()) {
      setSplit(50);
      return;
    }

    const ctx = gsap.context(() => {
      const state = { split: 8 };
      setSplit(state.split);

      // Cinematic auto-wipe as the section enters view.
      gsap.to(state, {
        split: 62,
        duration: 2.2,
        ease: EASE.fabric,
        onUpdate: () => setSplit(state.split),
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });

      gsap.fromTo(
        frameEl,
        { scale: 1.04, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      );

      // Manual exploration: pointer drag + keyboard.
      let dragging = false;
      const apply = (clientX: number) => {
        const rect = frameEl.getBoundingClientRect();
        state.split = ((clientX - rect.left) / rect.width) * 100;
        setSplit(state.split);
      };
      const onDown = (event: PointerEvent) => {
        dragging = true;
        gsap.killTweensOf(state);
        apply(event.clientX);
      };
      const onMove = (event: PointerEvent) => dragging && apply(event.clientX);
      const onUp = () => (dragging = false);

      frameEl.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp);

      const handle = frameEl.querySelector<HTMLElement>("[data-ba-handle]");
      const onKey = (event: KeyboardEvent) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        state.split += event.key === "ArrowRight" ? 5 : -5;
        setSplit(state.split);
      };
      handle?.addEventListener("keydown", onKey);

      return () => {
        frameEl.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        handle?.removeEventListener("keydown", onKey);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative py-16 md:py-28 overflow-hidden"
      aria-labelledby="transformation-heading"
    >
      <span className="ambient-orb -left-24 top-10 h-72 w-72" aria-hidden="true" />

      <Container className="relative z-10 space-y-10 md:space-y-14">
        <div className="max-w-2xl">
          <Reveal variant="fade-up" className="mb-4">
            <p className="eyebrow">The transformation</p>
          </Reveal>
          <SplitText
            as="h2"
            id="transformation-heading"
            text="The same room. A completely different feeling."
            className="h2 block mb-5"
          />
          <Reveal variant="blur" delay={0.15}>
            <p className="text-muted-foreground">
              Drag the divider to see what tailored curtains do to a space — light softened, proportions
              corrected, acoustics calmed. Nothing structural changed. Everything feels different.
            </p>
          </Reveal>
        </div>

        <div
          ref={frame}
          data-ba-frame
          className="relative rounded-none overflow-hidden border border-border select-none touch-pan-y cursor-ew-resize will-change-transform"
          style={{ ["--split" as string]: "8%" }}
        >
          <img
            src={BEFORE}
            alt="Modern living room with bare windows before curtains were installed"
            width={1600}
            height={1072}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover aspect-[16/10]"
          />

          <div
            className="absolute inset-0"
            style={{ clipPath: "inset(0 calc(100% - var(--split)) 0 0)" }}
          >
            <img
              src={AFTER}
              alt="The same living room after Curtains Hub installed floor-to-ceiling ivory curtains"
              width={1600}
              height={1072}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover aspect-[16/10]"
            />
          </div>

          {/* Divider */}
          <div
            className="absolute inset-y-0 w-px bg-primary/70"
            style={{ left: "var(--split)" }}
            aria-hidden="true"
          >
            <span
              data-ba-handle
              role="slider"
              tabIndex={0}
              aria-label="Reveal the room after curtain installation"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext="Drag or use arrow keys to compare before and after"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/80 border border-primary/60 backdrop-blur-sm flex items-center justify-center text-primary text-xs tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ↔
            </span>
          </div>

          <p className="absolute left-4 bottom-4 text-[0.65rem] tracking-[0.28em] uppercase text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full">
            Before
          </p>
          <p className="absolute right-4 bottom-4 text-[0.65rem] tracking-[0.28em] uppercase text-primary bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full">
            After
          </p>
        </div>
      </Container>
    </section>
  );
};

export default BeforeAfter;
