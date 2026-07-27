import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="relative overflow-hidden pt-20 md:pt-32" aria-labelledby="cta-heading">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <Container className="relative z-10 space-y-10">
                <StaggerContainer className="text-center max-w-2xl mx-auto">
                    <AnimateOnView blur>
                        <h2 id="cta-heading" className="h2 md:mb-5 mb-3">
                            Ready to Transform Your Space?
                        </h2>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.2}>
                        <p className="text-muted-foreground md:mb-10 mb-5">
                            Let Curtains Hub help you create a home that feels elegant, comfortable, and uniquely yours.
                        </p>
                    </AnimateOnView>
                    <AnimateOnView>
                        <Button asChild>
                            <Link to="/contact">Get Started Today</Link>
                        </Button>
                    </AnimateOnView>
                </StaggerContainer>

                <AnimateOnView delay={0.2} className="w-full max-w-[840px] mx-auto">
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
                </AnimateOnView>
            </Container>
        </section>
    );
};

export default CTA;
