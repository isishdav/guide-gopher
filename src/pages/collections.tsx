import Container from "@/components/container";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import PageHero from "@/components/sections/shared/page-hero";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { SITE_URL, brand, collections } from "@/data/site";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const FILTERS = ["All", "Curtains", "Sheer", "Blackout", "Motorized", "Accessories"] as const;
type Filter = (typeof FILTERS)[number];

const filterOf = (slug: string): Filter => {
  if (slug === "curtain-accessories") return "Accessories";
  if (slug === "motorized-curtains") return "Motorized";
  if (slug.includes("sheer")) return "Sheer";
  if (slug.includes("blackout")) return "Blackout";
  return "Curtains";
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Collections", item: `${SITE_URL}/collections` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Curtain Collections — Curtains Hub Kigali",
      itemListElement: collections.map((collection, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: collection.title,
          description: collection.description,
          image: `${SITE_URL}${collection.image}`,
          brand: { "@type": "Brand", name: brand.name },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "RWF",
            url: `${SITE_URL}/collections#${collection.slug}`,
          },
        },
      })),
    },
  ],
};

const CollectionsPage = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? collections : collections.filter((c) => filterOf(c.slug) === filter)),
    [filter],
  );

  return (
    <>
      <SEO
        title="Curtain Collections Kigali | Sheer, Blackout & Custom Curtains"
        description="Explore luxury curtain collections in Kigali, Rwanda — sheer curtains, blackout curtains, wave, pinch pleat, eyelet, linen and layered curtains, motorized curtains and curtain accessories."
        canonicalUrl="/collections"
        ogImage="/images/curtains/collection-luxury.jpg"
        keywords="luxury curtains Rwanda, curtains in Kigali, blackout curtains Rwanda, sheer curtains Kigali, motorized curtains Rwanda, custom curtains Kigali"
        jsonLd={jsonLd}
      />
      <Layout>
        <section className="hero-padding-top pb-14 md:pb-20 border-b border-border" aria-labelledby="collections-heading">
          <Container>
            <div className="max-w-[820px]">
              <AnimateOnView>
                <p className="eyebrow mb-5">Collections</p>
                <h1 id="collections-heading" className="h1 mb-5">Curtain Collections in Kigali</h1>
                <p className="text-body-md text-muted-foreground max-w-2xl">
                  Eleven signature ranges, each written around a way of living — from sheer voiles that soften a
                  Kigali morning to blackout drapes, motorized tracks and the accessories that hold it all together.
                </p>
              </AnimateOnView>
            </div>
          </Container>
        </section>

        <section className="section-y" aria-labelledby="all-collections">
          <Container className="space-y-12">
            <div className="flex flex-col gap-6">
              <h2 id="all-collections" className="h3">Browse by type</h2>
              <div role="group" aria-label="Filter collections" className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className="border border-border px-4 py-2.5 text-sm font-bold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:border-foreground"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <StaggerContainer className="space-y-16">
              {visible.map((collection, index) => (
                <AnimateOnView key={collection.slug} delay={0.05}>
                  <article
                    id={collection.slug}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center scroll-mt-32 ${index % 2 === 1 ? "lg:[&>figure]:order-2" : ""}`}
                  >
                    <figure className="overflow-hidden border border-border">
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
                      <p className="eyebrow">{collection.feeling}</p>
                      <h3 className="h3">{collection.title}</h3>
                      <p className="text-body-md text-muted-foreground">{collection.description}</p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button asChild>
                          <Link to="/contact">Request a Quote</Link>
                        </Button>
                        {collection.slug === "curtain-accessories" && (
                          <Button asChild variant="outline">
                            <Link to="/accessories">See all accessories</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </article>
                </AnimateOnView>
              ))}
            </StaggerContainer>

            {visible.length === 0 && (
              <p className="text-body-md text-muted-foreground">
                Nothing in this category yet — <Link to="/contact" className="underline underline-offset-4">tell us what you need</Link>.
              </p>
            )}
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default CollectionsPage;
