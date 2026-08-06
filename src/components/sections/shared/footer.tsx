import Container from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { Newsletter } from "@/components/ui/newsletter";
import { brand, collections, navLinks } from "@/data/site";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: Instagram, href: brand.social.instagram, label: "Curtains Hub on Instagram" },
  { icon: Facebook, href: brand.social.facebook, label: "Curtains Hub on Facebook" },
  { icon: Twitter, href: brand.social.x, label: "Curtains Hub on X" },
  { icon: Linkedin, href: brand.social.linkedin, label: "Curtains Hub on LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-secondary text-foreground pt-20 md:pt-28 pb-12 border-t border-border">
      <Container>
        <Reveal variant="fade-up" stagger={0.12} className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">
          {/* Company */}
          <div data-reveal-item className="space-y-7 lg:col-span-2 max-w-md">
            <Link to="/" className="flex items-center gap-3" aria-label="Curtains Hub — home">
              <img src="/images/curtains/logo.svg" alt="Curtains Hub logo" width={40} height={40} loading="lazy" className="h-10 w-10 object-contain" />
              <span className="text-[0.95rem] tracking-[0.22em] uppercase">Curtains Hub</span>
            </Link>
            <p className="text-muted-foreground text-body-sm">
              {brand.slogan} We shape the light in your home so your rooms feel calmer, more private and
              genuinely yours — measured, tailored and installed by our own craftspeople.
            </p>
            <div className="space-y-3">
              <h3 className="eyebrow">Letters on beautiful living</h3>
              <Newsletter className="max-w-[420px]" placeholder="Your email address" />
            </div>
          </div>

          {/* Quick links */}
          <nav data-reveal-item aria-label="Footer">
            <h3 className="eyebrow mb-6">Explore</h3>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Collections + contact */}
          <div data-reveal-item className="space-y-10">
            <div>
              <h3 className="eyebrow mb-6">Collections</h3>
              <ul className="space-y-3.5">
                {collections.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link to="/collections" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <address className="not-italic space-y-3 text-sm text-muted-foreground">
              <h3 className="eyebrow text-foreground mb-4">Talk to us</h3>
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{brand.address.street}, {brand.address.locality}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href={brand.phoneHref} className="hover:text-foreground transition-colors">{brand.phone}</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${brand.email}`} className="hover:text-foreground transition-colors">{brand.email}</a>
              </p>
              <p>{brand.hours}</p>
            </address>
          </div>
        </Reveal>

        <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © 2026 Curtains Hub. All rights reserved. ·{" "}
            <Link to="/legal/privacy-policy" className="hover:text-foreground transition-colors">Privacy</Link>
            {" · "}
            <Link to="/legal/terms-&-condition" className="hover:text-foreground transition-colors">Terms</Link>
          </p>

          <ul className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-background border border-border flex items-center justify-center hover:-translate-y-1 hover:border-foreground transition-all duration-500 text-muted-foreground hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
