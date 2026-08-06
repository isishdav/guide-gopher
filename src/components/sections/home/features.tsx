import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { Reveal } from '@/components/motion/reveal'
import { SplitText } from '@/components/motion/split-text'
import { services } from '@/data/site'
import { Link } from 'react-router-dom'
import Container from '../../container'
import { Button } from '../../ui/button'
import { Magnetic } from '@/components/motion/magnetic'

const Features = () => {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden" aria-labelledby="services-heading">
      <span className="ambient-orb right-[-10%] top-1/3 h-80 w-80" aria-hidden="true" />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <SplitText
            as="h2"
            id="services-heading"
            text="Everything your home needs, handled by one team."
            className="h2 mb-6 block"
          />
          <Reveal variant="blur" delay={0.1}>
            <p className="text-muted-foreground">
              From fabric selection and custom measurements to professional installation — Curtains Hub
              handles the whole journey so your interior design stays effortless.
            </p>
          </Reveal>
        </div>

        {/* Slide-in stagger — this section's own motion identity */}
        <Reveal
          variant="slide-right"
          stagger={0.07}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <Reveal
              item
              key={service.title}
              className="card-lux p-7 md:p-8 rounded-none bg-secondary border border-border"
            >
              <h3 className="h4 mb-2.5">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Reveal>
          ))}
        </Reveal>

        <AnimateOnView className="flex justify-center">
          <Magnetic strength={10}>
            <Button asChild className="sweep">
              <Link to="/services">How we work</Link>
            </Button>
          </Magnetic>
        </AnimateOnView>
      </Container>
    </section>
  )
}

export default Features
