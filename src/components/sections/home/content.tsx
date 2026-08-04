import { Counter } from '@/components/motion/counter'
import { Reveal } from '@/components/motion/reveal'
import { SplitText } from '@/components/motion/split-text'
import { stats } from '@/data/site'
import Container from '../../container'

const Content = () => {
  return (
    <section className="py-16 md:py-24" aria-labelledby="stats-heading">
      <Container className="space-y-10 md:space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <SplitText
            as="h2"
            id="stats-heading"
            text="Fifteen years of better mornings."
            className="h2 md:mb-5 mb-3 block"
          />
          <Reveal variant="blur" delay={0.1}>
            <p className="text-muted-foreground">
              Numbers we are quietly proud of — earned one perfectly hung curtain at a time.
            </p>
          </Reveal>
        </div>

        {/* Scale-in stagger with smooth counters */}
        <Reveal
          variant="scale"
          stagger={0.09}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {stats.map((stat) => (
            <Reveal
              item
              key={stat.label}
              className="card-lux p-7 rounded-[24px] bg-secondary border border-border text-center lg:text-left"
            >
              <p className="h3 mb-2 tabular-nums">
                <Counter value={stat.value} />
              </p>
              <h3 className="text-base font-medium mb-1">{stat.label}</h3>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}

export default Content
