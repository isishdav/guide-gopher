import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/motion/magnetic'
import { Reveal } from '@/components/motion/reveal'
import { SplitText } from '@/components/motion/split-text'
import { whyChoose } from '@/data/site'
import { Link } from 'react-router-dom'
import Container from '../../container'

const Confidence = () => {
  return (
    <section className="relative bg-background overflow-hidden py-16 md:py-28" aria-labelledby="why-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" aria-hidden="true" />
      <span className="ambient-orb left-1/4 -top-10 h-96 w-96" aria-hidden="true" />

      <Container className="relative z-10 space-y-12">
        <div className="text-center max-w-[640px] mx-auto">
          <SplitText as="h2" id="why-heading" text="Why families trust us with their homes." className="h2 md:mb-5 mb-3 block" />
          <Reveal variant="blur" delay={0.1}>
            <p className="text-muted-foreground md:mb-8 mb-5">
              Premium materials, elegant craftsmanship and a personal designer — the quiet details that make
              a room feel considered rather than decorated.
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <Magnetic strength={10}>
              <Button asChild className="sweep">
                <Link to="/about">Our story</Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>

        {/* Centre-out mask reveal — unique to this section */}
        <Reveal
          variant="clip-center"
          stagger={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {whyChoose.map((item) => (
            <Reveal
              item
              key={item.title}
              className="card-lux p-7 md:p-8 rounded-[24px] border border-border bg-background"
            >
              <h3 className="h5 mb-2.5">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}

export default Confidence
