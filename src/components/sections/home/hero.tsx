import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { waitForIntro } from "@/lib/motion/intro";
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CurtainScene = lazy(() => import("@/components/ui/three/curtain-scene"));

const Hero = () => {
  const [showScene, setShowScene] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const id = window.setTimeout(() => setShowScene(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set("[data-hero-curtain]", { autoAlpha: 0 });
      gsap.set("[data-hero-fade]", { opacity: 1, y: 0 });
      return;
    }

    let cancelled = false;
    const ctx = gsap.context(() => {
      // ---- Cinematic entrance -------------------------------------------
      const intro = gsap.timeline({ paused: true, defaults: { ease: EASE.luxe } });

      intro
        .fromTo(
          "[data-hero-bg]",
          { scale: 1.16 },
          { scale: 1, duration: 2.6, ease: EASE.cinematic },
          0,
        )
        .to(
          "[data-hero-curtain='left']",
          { xPercent: -102, duration: 2.1, ease: EASE.fabric },
          0.1,
        )
        .to(
          "[data-hero-curtain='right']",
          { xPercent: 102, duration: 2.1, ease: EASE.fabric },
          0.1,
        )
        .fromTo(
          "[data-hero-eyebrow]",
          { opacity: 0, y: 16, letterSpacing: "0.6em" },
          { opacity: 1, y: 0, letterSpacing: "0.34em", duration: 1.2 },
          0.9,
        )
        .fromTo(
          "[data-hero-copy]",
          { opacity: 0, y: 26, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
          1.7,
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          2,
        )
        .fromTo(
          "[data-hero-cue]",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.9 },
          2.4,
        );

      waitForIntro().then(() => {
        if (!cancelled) intro.play();
      });

      // ---- Scroll-linked parallax ---------------------------------------
      gsap.to("[data-hero-parallax]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -6,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative bg-background overflow-hidden hero-padding-top pb-14 md:pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div
          data-hero-content
          className="max-w-[46rem] 2xl:max-w-[54rem] mx-auto text-center will-change-transform"
        >
          <p data-hero-eyebrow className="eyebrow mb-6 opacity-0">
            Curtains Hub — Your Confidence Begins Here
          </p>

          <SplitText
            as="h1"
            id="hero-heading"
            text="Come home to softer mornings."
            className="h1 text-foreground mb-7 block"
            immediate
            afterIntro
          />

          <p
            data-hero-copy
            data-hero-fade
            className="text-body-lg max-w-2xl mx-auto mb-10 text-muted-foreground opacity-0"
          >
            We don't sell curtains. We create the calm, private, beautifully lit rooms your family
            actually wants to spend their evenings in.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic className="w-full sm:w-auto">
              <span data-hero-cta data-hero-fade className="block opacity-0">
                <Button asChild size="lg" className="w-full sm:w-auto min-h-11 sweep">
                  <Link to="/collections">Explore the collections</Link>
                </Button>
              </span>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <span data-hero-cta data-hero-fade className="block opacity-0">
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto min-h-11">
                  <Link to="/contact">Book a free home visit</Link>
                </Button>
              </span>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Editorial hero image with the signature curtain reveal */}
      <div className="relative z-10 mt-14 md:mt-20 px-4 md:px-6 3xl:px-16">
        <div
          data-hero-parallax
          className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[28px] md:rounded-[40px] shadow-lift will-change-transform"
        >
          <img
            data-hero-bg
            src="/images/curtains/hero-light.jpg"
            alt="Sunlit minimalist living room where sheer linen curtains soften the daylight"
            width={1920}
            height={1088}
            fetchPriority="high"
            decoding="async"
            className="w-full h-[52vh] min-h-[320px] md:h-[68vh] md:min-h-[460px] object-cover will-change-transform"
          />

          {showScene && (
            <div className="absolute inset-0 pointer-events-none animate-fade-in" aria-hidden="true">
              <Suspense fallback={null}>
                <CurtainScene />
              </Suspense>
            </div>
          )}

          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              data-hero-curtain="left"
              className="absolute inset-y-0 left-0 w-[52%] curtain-fabric curtain-fabric--left"
            />
            <div
              data-hero-curtain="right"
              className="absolute inset-y-0 right-0 w-[52%] curtain-fabric curtain-fabric--right"
            />
          </div>
        </div>

        <div
          data-hero-cue
          data-hero-fade
          className="mt-10 flex flex-col items-center gap-3 opacity-0"
          aria-hidden="true"
        >
          <span className="eyebrow">Scroll</span>
          <span className="relative block h-12 w-px bg-foreground/10 overflow-hidden">
            <span className="scroll-cue-dot absolute left-0 top-0 block h-4 w-px bg-foreground" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
