import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { whyChoose } from '@/data/site'
import { Link } from 'react-router-dom'
import Container from '../../container'

const Confidence = () => {
  return (
    <section className="relative bg-background overflow-hidden py-12 md:py-[80px]" aria-labelledby="why-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10 space-y-12">
        <StaggerContainer className="text-center max-w-[640px] mx-auto">
          <AnimateOnView blur>
            <h2 id="why-heading" className="h2 md:mb-5 mb-3">
              Why Choose Curtains Hub
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground md:mb-8 mb-5">
              Premium materials, elegant craftsmanship and a personal designer — the quiet details that make
              a room feel considered rather than decorated.
            </p>
          </AnimateOnView>
          <AnimateOnView>
            <Button asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChoose.map((item, index) => (
            <AnimateOnView
              key={item.title}
              delay={(index % 4) * 0.08}
              className="p-6 rounded-[20px] border border-border bg-card/60 backdrop-blur-sm"
            >
              <h3 className="h5 text-primary mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Confidence
