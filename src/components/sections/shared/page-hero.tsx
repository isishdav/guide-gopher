import Container from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { useLayoutEffect, useRef } from "react";

interface PageHeroProps {
    eyebrow?: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
}

const PageHero = ({ eyebrow, title, description, image, imageAlt }: PageHeroProps) => {
    const root = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = root.current;
        if (!el || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                "[data-page-hero-bg]",
                { scale: 1.14 },
                { scale: 1, duration: 2.2, ease: EASE.cinematic },
            );
            gsap.to("[data-page-hero-bg]", {
                yPercent: 10,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
            });
        }, el);

        return () => ctx.revert();
    }, [image]);

    return (
        <section ref={root} className="relative flex items-center overflow-hidden hero-padding-top pb-16 md:pb-24">
            <img
                data-page-hero-bg
                src={image}
                alt={imageAlt}
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" aria-hidden="true" />

            <Container className="relative z-10">
                <div className="max-w-[760px]">
                    {eyebrow && (
                        <Reveal variant="fade-up" immediate>
                            <p className="text-primary tracking-[0.28em] uppercase text-xs md:text-sm mb-5">{eyebrow}</p>
                        </Reveal>
                    )}
                    <SplitText as="h1" text={title} className="h1 mb-4 block" immediate delay={0.15} />
                    <Reveal variant="blur" delay={0.45} immediate>
                        <p className="text-body-md text-muted-foreground">{description}</p>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
};

export default PageHero;
