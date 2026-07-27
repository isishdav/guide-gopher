import Container from "@/components/container";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import Confidence from "@/components/sections/home/confidence";
import Content from "@/components/sections/home/content";
import PageHero from "@/components/sections/shared/page-hero";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";

const About = () => {
  return (
    <>
      <SEO
        title="About Curtains Hub | Premium Curtain Makers & Installers"
        description="Curtains Hub is a premium curtain company crafting elegant, durable window and door curtains for modern interiors — measured, tailored and installed by our own team."
        canonicalUrl="/about"
        ogImage="/images/curtains/about.jpg"
      />
      <Layout>
        <PageHero
          eyebrow="About Curtains Hub"
          title="Premium Curtains, Made the Way They Should Be"
          description="Fifteen years of tailoring window and door curtains that combine elegance, durability, privacy and modern interior design."
          image="/images/curtains/about.jpg"
          imageAlt="Curtains Hub showroom with rolls of luxury curtain fabric in cream, charcoal and gold"
        />

        <section className="py-12 md:py-[60px]" aria-labelledby="story-heading">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimateOnView blur className="space-y-5">
                <h2 id="story-heading" className="h2">Curtains that carry a room</h2>
                <p className="text-muted-foreground">
                  Curtains Hub began in a single workshop with one belief: a curtain is not an accessory, it is
                  architecture in fabric. It decides how light enters a room, how private it feels, how warm it
                  stays and how finished it looks. So we treat every panel like a tailored garment for the window.
                </p>
                <p className="text-muted-foreground">
                  Today we design, measure, stitch and install premium curtains for homeowners, interior designers,
                  architects, hotels, apartments, offices, property developers and commercial buildings. Luxury
                  velvets, whisper-light sheers, triple-weave blackout linings and performance weaves — all
                  selected for drape, colourfastness and longevity, then finished by hand.
                </p>
                <p className="text-muted-foreground">
                  Nothing is outsourced and nothing is guessed. One designer stays with your project from the first
                  fabric sample to the final level check on the track, which is why our clients describe the result
                  the same way: the room finally feels complete.
                </p>
              </AnimateOnView>

              <AnimateOnView delay={0.15}>
                <figure className="rounded-[24px] overflow-hidden border border-border">
                  <img
                    src="/images/curtains/collection-custom.jpg"
                    alt="Curtains Hub tailor hand-finishing a bespoke curtain header on premium fabric"
                    width={1024}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <figcaption className="sr-only">Hand-finishing a bespoke curtain in the Curtains Hub workshop</figcaption>
                </figure>
              </AnimateOnView>
            </div>
          </Container>
        </section>

        <Content />
        <Confidence />
      </Layout>
    </>
  );
};

export default About;
