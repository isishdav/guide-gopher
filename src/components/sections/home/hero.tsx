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
          { scale: 1.18 },
          { scale: 1, duration: 2.6, ease: EASE.cinematic },
          0,
        )
        .fromTo("[data-hero-overlay]", { opacity: 1 }, { opacity: 0.92, duration: 1.6 }, 0)
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
          { opacity: 0, y: 16, letterSpacing: "0.5em" },
          { opacity: 1, y: 0, letterSpacing: "0.28em", duration: 1.2 },
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
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -8,
        opacity: 0.2,
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
      className="relative flex items-center justify-center overflow-hidden hero-padding-top pb-20 md:pb-32"
      aria-labelledby="hero-heading"
    >
      <div data-hero-parallax className="absolute inset-0 will-change-transform">
        <img
          data-hero-bg
          src="/images/curtains/hero.jpg"
          alt="Luxury living room at golden hour with floor-to-ceiling ivory curtains diffusing natural light"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div
          data-hero-overlay
          className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background"
          aria-hidden="true"
        />
      </div>

      {/* Signature curtain reveal — two panels part like heavy fabric */}
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

      {showScene && (
        <div className="absolute inset-0 pointer-events-none animate-fade-in" aria-hidden="true">
          <Suspense fallback={null}>
            <CurtainScene />
          </Suspense>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div data-hero-content className="max-w-4xl mx-auto text-center will-change-transform">
          <p
            data-hero-eyebrow
            className="text-primary tracking-[0.28em] uppercase text-xs md:text-sm mb-5 opacity-0"
          >
            Your Confidence Begins Here
          </p>

          <SplitText
            as="h1"
            id="hero-heading"
            text="Luxury Curtains That Transform Every Space"
            className="h1 text-foreground mb-5 block"
            immediate
            afterIntro
          />

          <p
            data-hero-copy
            data-hero-fade
            className="text-body-md max-w-2xl mx-auto mb-8 text-muted-foreground opacity-0"
          >
            Bring elegance, comfort, privacy, and confidence into your home with premium curtains
            designed for modern living.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic data-hero-cta className="w-full sm:w-auto">
              <span data-hero-cta data-hero-fade className="block opacity-0">
                <Button asChild size="lg" className="w-full sm:w-auto min-h-11 sweep">
                  <Link to="/collections">Explore Collection</Link>
                </Button>
              </span>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <span data-hero-cta data-hero-fade className="block opacity-0">
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto min-h-11">
                  <Link to="/contact">Book a Free Consultation</Link>
                </Button>
              </span>
            </Magnetic>
          </div>

          <div
            data-hero-cue
            data-hero-fade
            className="mt-14 flex flex-col items-center gap-3 opacity-0"
            aria-hidden="true"
          >
            <span className="text-[0.65rem] tracking-[0.32em] uppercase text-muted-foreground">
              Scroll
            </span>
            <span className="relative block h-12 w-px bg-white/12 overflow-hidden">
              <span className="scroll-cue-dot absolute left-0 top-0 block h-4 w-px bg-primary" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
