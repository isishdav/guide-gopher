import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { services } from '@/data/site'
import { Link } from 'react-router-dom'
import Container from '../../container'
import { Button } from '../../ui/button'

const Features = () => {
  return (
    <section className="py-12 md:py-[60px] bg-background" aria-labelledby="services-heading">
      <Container className="space-y-8 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 id="services-heading" className="h2 mb-6">
              Everything Your Windows Need, Under One Roof
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              From fabric selection and custom measurements to professional installation — Curtains Hub
              handles the whole journey so your interior design stays effortless.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <AnimateOnView
                key={service.title}
                delay={(index % 3) * 0.08}
                className="p-6 rounded-[20px] bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="h4 mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>

        <AnimateOnView className="flex justify-center">
          <Button asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </AnimateOnView>
      </Container>
    </section>
  )
}

export default Features
