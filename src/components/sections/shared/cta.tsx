import Container from "@/components/container";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="relative overflow-hidden pt-24 md:pt-36" aria-labelledby="cta-heading">
            <div className="absolute inset-0 bg-background" aria-hidden="true" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-background to-background pointer-events-none" aria-hidden="true" />
            <span className="ambient-orb left-1/2 -translate-x-1/2 top-0 h-[420px] w-[420px]" aria-hidden="true" />

            <Container className="relative z-10 space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                    <SplitText
                        as="h2"
                        id="cta-heading"
                        text="Your home is ready to feel different."
                        className="h2 md:mb-5 mb-3 block"
                    />
                    <Reveal variant="blur" delay={0.1}>
                        <p className="text-muted-foreground md:mb-10 mb-5">
                            One visit, no cost, no pressure — just an honest conversation about how your rooms could feel.
                        </p>
                    </Reveal>
                    <Reveal variant="fade-up" delay={0.2}>
                        <Magnetic strength={12}>
                            <Button asChild size="lg" className="sweep">
                                <Link to="/contact">Book a free home visit</Link>
                            </Button>
                        </Magnetic>
                    </Reveal>
                </div>

                <Reveal variant="clip-center" className="w-full max-w-[840px] mx-auto">
                    <figure className="rounded-[24px] overflow-hidden border border-border">
                        <img
                            src="/images/curtains/project-1.jpg"
                            alt="Luxury penthouse dining room dressed with full-height ivory curtains by Curtains Hub"
                            width={1024}
                            height={768}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover aspect-[840/420]"
                        />
                    </figure>
                </Reveal>
            </Container>
        </section>
    );
};

export default CTA;
