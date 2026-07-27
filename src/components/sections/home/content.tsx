import { AnimateOnView } from '@/components/ui/motion/animate-on-view';
import { StaggerContainer } from '@/components/ui/motion/stagger';
import { stats } from '@/data/site';
import Container from '../../container';

const Content = () => {
  return (
    <section className="py-12 md:py-[60px]" aria-labelledby="stats-heading">
      <Container className="space-y-8 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 id="stats-heading" className="h2 md:mb-5 mb-3">
              Fifteen Years of Beautiful Windows
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Numbers we are quietly proud of — earned one perfectly hung curtain at a time.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((stat, index) => (
            <AnimateOnView
              key={stat.label}
              delay={index * 0.08}
              className="p-6 rounded-[20px] bg-card border border-border text-center lg:text-left"
            >
              <p className="h3 text-primary mb-2">{stat.value}</p>
              <h3 className="text-base font-medium mb-1">{stat.label}</h3>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default Content;
