import Container from "@/components/container";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import PageHero from "@/components/sections/shared/page-hero";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { SITE_URL, accessories, brand } from "@/data/site";
import { Link } from "react-router-dom";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Accessories", item: `${SITE_URL}/accessories` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Curtain Accessories in Kigali, Rwanda",
      itemListElement: accessories.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.title,
          description: item.description,
          image: `${SITE_URL}${item.image}`,
          brand: { "@type": "Brand", name: brand.name },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "RWF",
            url: `${SITE_URL}/accessories`,
          },
        },
      })),
    },
  ],
};

const AccessoriesPage = () => {
  return (
    <>
      <SEO
        title="Curtain Accessories Rwanda | Rods, Tracks & Tiebacks in Kigali"
        description="Curtain accessories in Kigali, Rwanda — curtain rods, ceiling tracks, finials, tiebacks, rings, brackets, motors and blackout linings. Supplied and professionally fitted by Curtains Hub, Nyabugogo."
        canonicalUrl={`${SITE_URL}/accessories`}
        ogImage={`${SITE_URL}/images/curtains/cat-accessories.jpg`}
        jsonLd={jsonLd}
      />
      <Layout>
        <PageHero
          eyebrow="Accessories"
          title="Curtain Accessories in Kigali"
          description="Rods, tracks, finials, tiebacks, rings, brackets, motors and linings — the quiet hardware that decides whether curtains hang beautifully for a decade or sag within a season."
          image="/images/curtains/cat-accessories.jpg"
          imageAlt="Luxury curtain accessories including matte black rods, finials, rings and tassel tiebacks on white marble"
        />

        <section className="section-y" aria-labelledby="accessories-heading">
          <Container className="space-y-12">
            <div className="max-w-2xl space-y-4">
              <p className="eyebrow">Everything that holds it together</p>
              <h2 id="accessories-heading" className="h2">
                Hardware chosen with the same care as the fabric
              </h2>
              <p className="text-body-md text-muted-foreground">
                We stock and fit premium curtain accessories across Kigali and Rwanda — whether you are dressing a
                new home, upgrading existing curtains or replacing a single bracket.
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessories.map((item) => (
                <AnimateOnView key={item.title} delay={0.05}>
                  <article className="card-lux h-full border border-border bg-card overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.title} — curtain accessories by Curtains Hub Kigali`}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover aspect-[4/3]"
                    />
                    <div className="p-6 space-y-2">
                      <h3 className="h5">{item.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground">{item.description}</p>
                    </div>
                  </article>
                </AnimateOnView>
              ))}
            </StaggerContainer>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="sweep">
                <Link to="/contact">Request accessory pricing</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/collections">Browse curtain collections</Link>
              </Button>
            </div>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default AccessoriesPage;
