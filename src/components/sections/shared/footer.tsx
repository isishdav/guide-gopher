import Container from "@/components/container";
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
    <footer className="bg-[#070707] text-foreground pt-24 pb-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Company */}
          <div className="space-y-6 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3" aria-label="Curtains Hub — home">
              <img src="/images/curtains/logo-mark.png" alt="Curtains Hub logo" width={44} height={44} loading="lazy" className="h-11 w-11 object-contain" />
              <span className="text-lg tracking-[0.18em] uppercase">Curtains Hub</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              {brand.slogan} Curtains Hub tailors luxury curtains, blackout curtains and bespoke window
              solutions for homes, hotels, offices and developments — measured, made and installed by our own team.
            </p>
            <div className="space-y-3">
              <h3 className="text-base font-medium">Newsletter</h3>
              <Newsletter className="max-w-[420px]" placeholder="Enter your email" />
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Collections + contact */}
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold mb-6">Collections</h3>
              <ul className="space-y-4">
                {collections.slice(0, 4).map((c) => (
                  <li key={c.slug}>
                    <Link to="/collections" className="text-muted-foreground hover:text-primary transition-colors">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <address className="not-italic space-y-3 text-muted-foreground">
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" aria-hidden="true" />
                <span>{brand.address.street}, {brand.address.locality}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={brand.phoneHref} className="hover:text-primary transition-colors">{brand.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${brand.email}`} className="hover:text-primary transition-colors">{brand.email}</a>
              </p>
              <p className="text-sm">{brand.hours}</p>
            </address>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © 2026 Curtains Hub. All Rights Reserved. ·{" "}
            <Link to="/legal/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            {" · "}
            <Link to="/legal/terms-&-condition" className="hover:text-primary transition-colors">Terms</Link>
          </p>

          <ul className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-muted-foreground hover:text-primary"
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
