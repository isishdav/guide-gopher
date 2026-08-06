import Container from "@/components/container";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Editorial, Nike-style collection gallery: varied tile sizes, generous white
 * space, imagery of rooms people want to live in rather than product shots.
 */
const spans = [
  "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-[4/5]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-4 aspect-[3/4]",
  "md:col-span-8 aspect-[16/10]",
  "md:col-span-6 aspect-[4/3]",
  "md:col-span-6 aspect-[4/3]",
  "md:col-span-8 aspect-[16/10]",
  "md:col-span-4 aspect-[3/4]",
  "md:col-span-12 aspect-[16/9]",
];

const CollectionsGallery = () => {
  return (
    <section className="section-y" aria-labelledby="gallery-heading">
      <Container className="space-y-14 md:space-y-20">
        <div className="max-w-3xl">
          <Reveal variant="fade-up" className="mb-5">
            <p className="eyebrow">The collections</p>
          </Reveal>
          <SplitText
            as="h2"
            id="gallery-heading"
            text="Imagine your rooms, quietly transformed."
            className="h2 mb-6 block"
          />
          <Reveal variant="blur" delay={0.1}>
            <p className="text-body-md text-muted-foreground max-w-2xl">
              Every range below exists for a feeling — deeper sleep, softer light, more privacy, warmer
              evenings. Choose how you want to live, and we will tailor the rest.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {collections.map((collection, index) => (
            <Reveal
              key={collection.slug}
              variant="fade-up"
              delay={(index % 3) * 0.08}
              className={`group ${spans[index % spans.length]}`}
            >
              <Link
                to="/collections"
                aria-label={`${collection.title} — ${collection.feeling}`}
                className="card-lux relative block h-full w-full overflow-hidden rounded-none bg-secondary border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <img
                  src={collection.image}
                  alt={collection.alt}
                  width={1280}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between gap-4 text-white">
                  <span className="block">
                    <span className="block text-[0.6rem] uppercase tracking-[0.32em] text-white/75 mb-2">
                      {collection.feeling}
                    </span>
                    <span className="block h4 text-white">{collection.title}</span>
                  </span>
                  <span className="shrink-0 h-11 w-11 rounded-full bg-white/95 text-foreground flex items-center justify-center translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade-up" className="flex justify-center">
          <Magnetic strength={10}>
            <Button asChild size="lg" className="sweep">
              <Link to="/collections">See every collection</Link>
            </Button>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
};

export default CollectionsGallery;
