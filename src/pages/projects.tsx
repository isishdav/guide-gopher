import Container from "@/components/container";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import PageHero from "@/components/sections/shared/page-hero";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { projects } from "@/data/site";

const ProjectsPage = () => {
  return (
    <>
      <SEO
        title="Curtain Projects & Gallery | Homes, Hotels & Offices"
        description="Browse Curtains Hub projects: luxury homes, penthouses, hotel suites, lobbies, offices and developments dressed with bespoke curtains and expert installation."
        canonicalUrl="/projects"
        ogImage="/images/curtains/project-3.jpg"
      />
      <Layout>
        <PageHero
          eyebrow="Projects"
          title="Spaces We Have Transformed"
          description="Elegant homes, five-star hotels, corporate floors and show apartments — a gallery of Curtains Hub installations in natural light."
          image="/images/curtains/project-3.jpg"
          imageAlt="Grand hotel lobby with towering floor-to-ceiling curtains installed by Curtains Hub"
        />

        <section className="py-12 md:py-[60px]" aria-labelledby="gallery">
          <Container className="space-y-12">
            <AnimateOnView blur className="text-center max-w-2xl mx-auto">
              <h2 id="gallery" className="h2 mb-4">Selected Work</h2>
              <p className="text-muted-foreground">
                Every project below was measured, tailored and installed by our own team.
              </p>
            </AnimateOnView>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <AnimateOnView key={project.title} delay={(index % 3) * 0.08}>
                  <article className="group h-full rounded-none overflow-hidden bg-card border border-border">
                    <figure className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.alt}
                        width={1024}
                        height={768}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </figure>
                    <div className="p-6 space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary">{project.category}</p>
                      <h3 className="h4">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
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

export default ProjectsPage;
