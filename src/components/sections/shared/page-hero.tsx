import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";

interface PageHeroProps {
    eyebrow?: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
}

const PageHero = ({ eyebrow, title, description, image, imageAlt }: PageHeroProps) => {
    return (
        <section className="relative flex items-center overflow-hidden hero-padding-top pb-16 md:pb-24">
            <img
                src={image}
                alt={imageAlt}
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" aria-hidden="true" />

            <Container className="relative z-10">
                <StaggerContainer className="max-w-[760px]">
                    {eyebrow && (
                        <AnimateOnView blur>
                            <p className="text-primary tracking-[0.28em] uppercase text-xs md:text-sm mb-5">{eyebrow}</p>
                        </AnimateOnView>
                    )}
                    <AnimateOnView blur>
                        <h1 className="h1 mb-4">{title}</h1>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.1}>
                        <p className="text-body-md text-muted-foreground">{description}</p>
                    </AnimateOnView>
                </StaggerContainer>
            </Container>
        </section>
    );
};

export default PageHero;
