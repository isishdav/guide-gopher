import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { collections } from '@/data/site'
import { Link } from 'react-router-dom'
import Container from '../../container'
import { Button } from '../../ui/button'

const Collections = () => {
  return (
    <section className="py-12 md:py-[60px]" aria-labelledby="collections-heading">
      <Container className="space-y-8 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 id="collections-heading" className="h2 mb-5">
              Our Curtain Collections
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Six signature ranges of window curtains and door curtains — each tailored, lined and installed
              to suit the way you actually live and work.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <AnimateOnView key={collection.slug} delay={(index % 3) * 0.08}>
              <article className="group h-full rounded-[24px] overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors">
                <figure className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.alt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </figure>
                <div className="p-6 space-y-3">
                  <h3 className="h4">{collection.title}</h3>
                  <p className="text-muted-foreground text-sm">{collection.description}</p>
                </div>
              </article>
            </AnimateOnView>
          ))}
        </StaggerContainer>

        <AnimateOnView className="flex justify-center">
          <Button asChild>
            <Link to="/collections">Explore Collection</Link>
          </Button>
        </AnimateOnView>
      </Container>
    </section>
  )
}

export default Collections
