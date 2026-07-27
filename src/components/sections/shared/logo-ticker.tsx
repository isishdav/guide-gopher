import Container from "@/components/container";
import FeatureTicker from "@/components/ui/feature-ticker";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";

const partners = [
    "Aurelia Hotels",
    "Reyes Studio",
    "Northline Developments",
    "Meridian Offices",
    "Harbour View Residences",
    "Atelier Interiors",
];

const LogoTicker = () => {
    return (
        <section className="overflow-hidden md:py-[60px] py-12" aria-label="Clients and partners">
            <Container>
                <p className="text-center text-sm tracking-[0.24em] uppercase text-muted-foreground mb-8">
                    Trusted by designers, hotels and developers
                </p>
                <AnimateOnView y={40} delay={0.3} className="relative w-full">
                    <FeatureTicker speed={20} pauseOnHover={true} gap="12">
                        {partners.map((partner) => (
                            <span
                                key={partner}
                                className="whitespace-nowrap text-xl md:text-2xl tracking-[0.12em] uppercase text-muted-foreground/70"
                            >
                                {partner}
                            </span>
                        ))}
                    </FeatureTicker>
                </AnimateOnView>
            </Container>
        </section>
    );
};

export default LogoTicker;
