import Container from "@/components/container";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import Confidence from "@/components/sections/home/confidence";
import PageHero from "@/components/sections/shared/page-hero";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { services } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Curtains Hub Services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: { "@type": "Organization", name: "Curtains Hub" },
    },
  })),
};

const steps = [
  { title: "1. Free Consultation", description: "A designer visits your space, listens to how you use it and brings fabric samples to see in your own light." },
  { title: "2. Custom Measurement", description: "Every window and door is laser-measured so drops, pleats and returns are exact to the millimetre." },
  { title: "3. Tailoring", description: "Your curtains are cut, lined and hand-finished in our workshop, usually within ten working days." },
  { title: "4. Professional Installation", description: "Certified fitters install tracks and rods, dress every fold and leave your space spotless." },
];

const ServicesPage = () => {
  return (
    <>
      <SEO
        title="Curtain Services | Custom Measurement, Tailoring & Installation"
        description="Curtains Hub services include premium fabrics, custom measurements, blackout and sheer curtains, hotel and office solutions, free consultation, fast delivery and professional curtain installation."
        canonicalUrl="/services"
        ogImage="/images/curtains/collection-custom.jpg"
        jsonLd={jsonLd}
      />
      <Layout>
        <PageHero
          eyebrow="Services"
          title="From First Sample to Final Fold"
          description="A complete curtain service — fabric consultancy, custom measurement, tailoring, delivery and expert installation, handled by one team."
          image="/images/curtains/collection-custom.jpg"
          imageAlt="Craftsman hand-finishing a bespoke curtain header with brass rings in the Curtains Hub workshop"
        />

        <section className="py-12 md:py-[60px]" aria-labelledby="services-list">
          <Container className="space-y-12">
            <AnimateOnView blur className="text-center max-w-2xl mx-auto">
              <h2 id="services-list" className="h2 mb-4">What We Do</h2>
              <p className="text-muted-foreground">
                Ten services that cover every stage of dressing a window — residential, hospitality or commercial.
              </p>
            </AnimateOnView>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, index) => (
                <AnimateOnView key={service.title} delay={(index % 3) * 0.08} className="p-6 rounded-none bg-card border border-border">
                  <h3 className="h4 mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </AnimateOnView>
              ))}
            </StaggerContainer>
          </Container>
        </section>

        <section className="py-12 md:py-[60px] bg-card/30" aria-labelledby="process">
          <Container className="space-y-12">
            <AnimateOnView blur className="text-center max-w-2xl mx-auto">
              <h2 id="process" className="h2 mb-4">How It Works</h2>
              <p className="text-muted-foreground">Four calm steps between an empty window and a finished room.</p>
            </AnimateOnView>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((step, index) => (
                <AnimateOnView key={step.title} delay={index * 0.08} className="p-6 rounded-none border border-border bg-background">
                  <h3 className="h5 text-primary mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </AnimateOnView>
              ))}
            </StaggerContainer>
          </Container>
        </section>

        <Confidence />
      </Layout>
    </>
  );
};

export default ServicesPage;
