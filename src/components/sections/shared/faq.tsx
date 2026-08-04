import Container from "@/components/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { faqs } from "@/data/site";
import { Minus, Plus } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const FAQ = () => {
  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12" aria-labelledby="faq-heading">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Container>
        <AnimateOnView once blur>
          <div className="text-center mb-8 md:mb-24">
            <h2 id="faq-heading" className="h2">Questions, answered honestly.</h2>
          </div>
        </AnimateOnView>

        <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
          <AnimateOnView once className="max-w-[500px] w-full">
            <figure className="relative aspect-square w-full rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
              <img
                src="/images/curtains/collection-custom.jpg"
                alt="Curtains Hub craftsman hand-finishing a bespoke curtain header with brass rings"
                width={1024}
                height={768}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </figure>
          </AnimateOnView>

          <div className="max-w-[500px] w-full">
            <AnimateOnView once y={40}>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index}`} className="border-b border-border/40 px-0">
                    <AccordionTrigger className="text-left py-6 hover:no-underline [&>svg]:hidden">
                      <span className="h4 pr-8">{faq.question}</span>
                      <div className="relative flex items-center justify-center w-6 h-6 shrink-0" aria-hidden="true">
                        <Minus className="absolute w-5 h-5 transition-transform duration-300 scale-0 rotate-90 group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0" />
                        <Plus className="absolute w-5 h-5 transition-transform duration-300 scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-90" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimateOnView>
          </div>
        </div>

        <AnimateOnView once y={20} delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto md:mt-20 mt-8 md:py-2 md:pr-2 py-4 pr-4 pl-8 md:rounded-full rounded-md bg-card/50 border border-border/50 backdrop-blur-sm">
            <p className="text-lg font-medium text-center sm:text-left">
              Still deciding what would suit your home?
            </p>
            <Button asChild className="rounded-full px-6 w-full sm:w-auto">
              <Link to="/contact">Talk to a designer</Link>
            </Button>
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default FAQ;
