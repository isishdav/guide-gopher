import Container from "@/components/container";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import PageHero from "@/components/sections/shared/page-hero";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { testimonials } from "@/data/site";
import { Star } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Curtains Hub bespoke curtains",
  brand: { "@type": "Brand", name: "Curtains Hub" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "486" },
  review: testimonials.map((t) => ({
    "@type": "Review",
    name: t.title,
    reviewBody: t.quote,
    author: { "@type": "Person", name: t.author },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  })),
};

const TestimonialsPage = () => {
  return (
    <>
      <SEO
        title="Client Testimonials | Curtains Hub Reviews"
        description="Read what homeowners, interior designers, architects and hotel managers say about Curtains Hub luxury curtains, craftsmanship and installation service."
        canonicalUrl="/testimonials"
        ogImage="/images/curtains/project-2.jpg"
        jsonLd={jsonLd}
      />
      <Layout>
        <PageHero
          eyebrow="Testimonials"
          title="Trusted by People Who Notice Details"
          description="Designers, architects, hoteliers and homeowners on what changed after Curtains Hub dressed their windows."
          image="/images/curtains/project-2.jpg"
          imageAlt="Elegant master bedroom with layered sheer and blackout curtains by Curtains Hub"
        />

        <section className="py-12 md:py-[60px]" aria-labelledby="reviews">
          <Container className="space-y-12">
            <AnimateOnView blur className="text-center max-w-2xl mx-auto">
              <h2 id="reviews" className="h2 mb-4">Client Stories</h2>
              <p className="text-muted-foreground">An average rating of 4.9 from 486 verified post-installation reviews.</p>
            </AnimateOnView>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <AnimateOnView key={testimonial.id} delay={(index % 2) * 0.08}>
                  <figure className="h-full p-6 rounded-[24px] bg-card border border-border space-y-4">
                    <div className="flex gap-1" aria-label="Rated 5 out of 5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-primary fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <h3 className="h4">{testimonial.title}</h3>
                    <blockquote className="text-muted-foreground">“{testimonial.quote}”</blockquote>
                    <figcaption className="flex items-center gap-3 pt-2">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.author}, ${testimonial.role}`}
                        width={1024}
                        height={1024}
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span>
                        <span className="block font-semibold">{testimonial.author}</span>
                        <span className="block text-sm text-muted-foreground">{testimonial.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </AnimateOnView>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default TestimonialsPage;
