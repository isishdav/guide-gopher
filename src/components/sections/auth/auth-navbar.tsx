import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
    return (
        <header className="w-full md:top-10 top-6 mx-auto absolute z-40">
            <Container className="flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 xl:w-[25%] md:w-[30%] w-fit text-foreground">
                    <img src="/images/curtains/logo.svg" alt="Curtains Hub" className="h-6" />
                    <span className="font-bold text-xl tracking-tight hidden sm:inline uppercase">Curtains Hub</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-8 text-foreground/70">
                    <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
                    <Link to="/collections" className="hover:text-foreground transition-colors">Collections</Link>
                    <Link to="/services" className="hover:text-foreground transition-colors">Services</Link>
                    <Link to="/blog" className="hover:text-foreground transition-colors">Blogs</Link>
                </nav>

                <div className="flex gap-6 items-center lg:w-[25%] justify-end">
                    <Link to="/login" className="text-foreground hover:text-foreground transition-colors hidden sm:block">
                        Login
                    </Link>
                    <Button asChild>
                        <Link to="/signup">Open Account</Link>
                    </Button>
                </div>
            </Container>
        </header>
    );
};

export default AuthNavbar;
