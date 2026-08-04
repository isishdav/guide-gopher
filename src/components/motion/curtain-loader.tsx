import { useLayoutEffect, useRef, useState } from "react";
import { EASE, gsap } from "@/lib/motion/gsap";
import { completeIntro, introEnabled } from "@/lib/motion/intro";

/**
 * Cinematic entrance: logo mark → slogan → gold progress line → curtains part.
 * Runs once per session on the home page, then hands control to the hero
 * timeline via completeIntro().
 */
export const CurtainLoader = () => {
  const [mounted, setMounted] = useState(introEnabled);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!introEnabled) return;
    const el = root.current;
    if (!el) return;

    document.documentElement.classList.add("intro-lock");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("intro-lock");
          completeIntro();
          setMounted(false);
        },
      });

      tl.set("[data-loader-panel]", { xPercent: 0 })
        .fromTo(
          "[data-loader-logo]",
          { opacity: 0, scale: 0.86, filter: "blur(10px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: EASE.cinematic },
          0.15,
        )
        .fromTo(
          "[data-loader-slogan]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, ease: EASE.luxe },
          0.55,
        )
        .fromTo(
          "[data-loader-bar]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
          0.7,
        )
        .to("[data-loader-content]", { opacity: 0, duration: 0.5, ease: "power2.in" }, 1.95)
        .to(
          "[data-loader-panel='left']",
          { xPercent: -100, duration: 1.7, ease: EASE.fabric },
          2.1,
        )
        .to(
          "[data-loader-panel='right']",
          { xPercent: 100, duration: 1.7, ease: EASE.fabric },
          2.1,
        )
        .to(el, { autoAlpha: 0, duration: 0.4 }, 3.3);
    }, el);

    return () => {
      document.documentElement.classList.remove("intro-lock");
      ctx.revert();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      <div
        data-loader-panel="left"
        className="absolute inset-y-0 left-0 w-1/2 bg-white curtain-fabric curtain-fabric--left"
      />
      <div
        data-loader-panel="right"
        className="absolute inset-y-0 right-0 w-1/2 bg-white curtain-fabric curtain-fabric--right"
      />

      <div
        data-loader-content
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center"
      >
        <img
          data-loader-logo
          src="/images/curtains/logo-mark.png"
          alt=""
          width={64}
          height={64}
          className="h-14 w-14 object-contain"
        />
        <p data-loader-slogan className="eyebrow">
          Your Confidence Begins Here
        </p>
        <span className="block h-px w-40 md:w-56 bg-foreground/10 overflow-hidden">
          <span data-loader-bar className="block h-px w-full origin-left bg-foreground" />
        </span>
      </div>
    </div>
  );
};


export default CurtainLoader;
