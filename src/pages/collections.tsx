import Container from "@/components/container";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import PageHero from "@/components/sections/shared/page-hero";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { collections } from "@/data/site";
import { Link } from "react-router-dom";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Curtains Hub Collections",
  itemListElement: collections.map((collection, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: collection.title,
      description: collection.description,
      image: collection.image,
      brand: { "@type": "Brand", name: "Curtains Hub" },
    },
  })),
};

const CollectionsPage = () => {
  return (
    <>
      <SEO
        title="Curtain Collections | Luxury, Blackout, Sheer & Custom Curtains"
        description="Explore Curtains Hub collections: luxury curtains, blackout curtains, sheer curtains, office curtains, hotel curtains and fully custom window and door curtains."
        canonicalUrl="/collections"
        ogImage="/images/curtains/collection-luxury.jpg"
        jsonLd={jsonLd}
      />
      <Layout>
        <PageHero
          eyebrow="Collections"
          title="Curtain Collections for Every Kind of Space"
          description="Six signature ranges, each tailored to a way of living — from champagne velvet drapes to contract-grade hotel curtain systems."
          image="/images/curtains/collection-luxury.jpg"
          imageAlt="Champagne gold luxury velvet curtains framing tall windows in an elegant living room"
        />

        <section className="py-12 md:py-[60px]" aria-labelledby="all-collections">
          <Container className="space-y-12">
            <h2 id="all-collections" className="sr-only">All curtain collections</h2>
            <StaggerContainer className="space-y-16">
              {collections.map((collection, index) => (
                <AnimateOnView key={collection.slug} delay={0.05}>
                  <article className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? "lg:[&>figure]:order-2" : ""}`}>
                    <figure className="rounded-[24px] overflow-hidden border border-border">
                      <img
                        src={collection.image}
                        alt={collection.alt}
                        width={1024}
                        height={768}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover aspect-[4/3]"
                      />
                    </figure>
                    <div className="space-y-4">
                      <h3 className="h3">{collection.title}</h3>
                      <p className="text-muted-foreground">{collection.description}</p>
                      <Button asChild>
                        <Link to="/contact">Request a Quote</Link>
                      </Button>
                    </div>
                  </article>
                </AnimateOnView>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default CollectionsPage;
