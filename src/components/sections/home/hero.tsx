import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CurtainScene = lazy(() => import("@/components/ui/three/curtain-scene"));

const Hero = () => {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || smallScreen) return;
    const id = window.setTimeout(() => setShowScene(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden hero-padding-top pb-16 md:pb-24"
      aria-labelledby="hero-heading"
    >
      <img
        src="/images/curtains/hero.jpg"
        alt="Luxury living room at golden hour with floor-to-ceiling ivory curtains diffusing natural light"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" aria-hidden="true" />

      {showScene && (
        <div className="absolute inset-0 pointer-events-none animate-fade-in" aria-hidden="true">
          <Suspense fallback={null}>
            <CurtainScene />
          </Suspense>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">

        <div className="max-w-4xl mx-auto text-center">
          <StaggerContainer>
            <AnimateOnView blur>
              <p className="text-primary tracking-[0.28em] uppercase text-xs md:text-sm mb-5">
                Your Confidence Begins Here
              </p>
            </AnimateOnView>

            <AnimateOnView blur>
              <h1 id="hero-heading" className="h1 text-foreground mb-5">
                Luxury Curtains That Transform Every Space
              </h1>
            </AnimateOnView>

            <AnimateOnView blur delay={0.2}>
              <p className="text-body-md max-w-2xl mx-auto mb-8 text-muted-foreground">
                Bring elegance, comfort, privacy, and confidence into your home with premium curtains
                designed for modern living.
              </p>
            </AnimateOnView>

            <AnimateOnView className="flex flex-col sm:flex-row items-center justify-center gap-4" delay={0.3}>
              <Button asChild size="lg" className="w-full sm:w-auto min-h-11">
                <Link to="/collections">Explore Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto min-h-11">
                <Link to="/contact">Book a Free Consultation</Link>
              </Button>
            </AnimateOnView>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Hero;
