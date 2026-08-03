import { Magnetic } from '@/components/motion/magnetic'
import { Reveal } from '@/components/motion/reveal'
import { SplitText } from '@/components/motion/split-text'
import { collections } from '@/data/site'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../../container'
import { Button } from '../../ui/button'

const Collections = () => {
  return (
    <section className="py-16 md:py-24" aria-labelledby="collections-heading">
      <Container className="space-y-10 md:space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <SplitText
            as="h2"
            id="collections-heading"
            text="Our Curtain Collections"
            className="h2 mb-5 block"
          />
          <Reveal variant="blur" delay={0.1}>
            <p className="text-muted-foreground">
              Six signature ranges of window curtains and door curtains — each tailored, lined and installed
              to suit the way you actually live and work.
            </p>
          </Reveal>
        </div>

        {/* Clip-path fabric wipe, staggered card by card */}
        <Reveal
          variant="clip-right"
          stagger={0.14}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {collections.map((collection) => (
            <Reveal item key={collection.slug} className="h-full">
              <article className="card-lux group h-full rounded-[24px] overflow-hidden bg-card border border-border flex flex-col">
                <figure className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.alt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="p-6 space-y-3 flex-1 flex flex-col">
                  <h3 className="h4">{collection.title}</h3>
                  <p className="text-muted-foreground text-sm flex-1">{collection.description}</p>
                  <Link
                    to="/collections"
                    className="inline-flex items-center gap-1.5 text-sm text-primary opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0"
                  >
                    View collection
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </Reveal>

        <Reveal variant="fade-up" className="flex justify-center">
          <Magnetic strength={10}>
            <Button asChild className="sweep">
              <Link to="/collections">Explore Collection</Link>
            </Button>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  )
}

export default Collections
