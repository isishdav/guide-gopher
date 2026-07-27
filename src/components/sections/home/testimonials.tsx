import Container from "@/components/container"
import { AnimateOnView } from "@/components/ui/motion/animate-on-view"
import TestimonialSlider from "@/components/ui/testimonial-slider"

const Testimonials = () => {
    return (
        <section className="py-12 md:py-[60px]" aria-labelledby="testimonials-heading">
            <Container>
                <AnimateOnView blur>
                    <h2 id="testimonials-heading" className="h2 mb-5 text-center">
                        What Our Clients Say
                    </h2>
                </AnimateOnView>
                <TestimonialSlider />
            </Container>
        </section>
    )
}

export default Testimonials
