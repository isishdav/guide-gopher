
import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";

const teamMembers = [
    { name: "Albert Flores", title: "Chief Executive Officer", avatar: "/images/curtains/team-2.jpg" },
    { name: "Wade Warren", title: "Chief Executive Officer", avatar: "/images/curtains/team-4.jpg" },
    { name: "Annette Black", title: "Chief Executive Officer", avatar: "/images/curtains/team-1.jpg" },
    { name: "Annette Black", title: "Chief Executive Officer", avatar: "/images/curtains/team-3.jpg" },
    { name: "Esther Howard", title: "Chief Executive Officer", avatar: "/images/curtains/team-1.jpg" },
    { name: "Jane Cooper", title: "Chief Executive Officer", avatar: "/images/curtains/team-3.jpg" },
    { name: "Robert Fox", title: "Chief Executive Officer", avatar: "/images/curtains/team-4.jpg" },
    { name: "Robert Fox", title: "Chief Executive Officer", avatar: "/images/curtains/team-1.jpg" },
    { name: "Devon Lane", title: "Chief Executive Officer", avatar: "/images/curtains/team-2.jpg" },
    { name: "Kristin Watson", title: "Chief Executive Officer", avatar: "/images/curtains/team-3.jpg" },
    { name: "Ralph Edwards", title: "Chief Executive Officer", avatar: "/images/curtains/team-1.jpg" },
    { name: "Ralph Edwards", title: "Chief Executive Officer", avatar: "/images/curtains/team-2.jpg" },
];

const TeamGrid = () => {
    return (
        <section className="md:py-[60px] py-12">
            <Container className="md:space-y-20 space-y-8">
                <StaggerContainer className="text-center md:max-w-[630px] max-w-xs mx-auto">
                    <AnimateOnView blur>
                        <h2 className="h2 md:mb-5 mb-3">
                            Trusted by high growth teams
                        </h2>
                    </AnimateOnView>

                    <AnimateOnView blur delay={0.1}>
                        <p className="text-muted-foreground">
                            Our growth reflects one mission — helping people and companies achieve financial confidence with clarity and ease.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-4">
                    {teamMembers.map((member, index) => (
                        <AnimateOnView
                            key={index}
                            className="p-4 rounded-none bg-card border border-border flex flex-col md:flex-row text-center md:text-left items-center gap-4 transition-all duration-300 hover:bg-white/5"
                        >
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-12 h-12 rounded-none object-cover"
                            />
                            <div className="flex flex-col min-w-0">
                                <span className="text-white font-semibold truncate">{member.name}</span>
                                <span className="text-xs text-muted-foreground truncate">{member.title}</span>
                            </div>
                        </AnimateOnView>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TeamGrid;
