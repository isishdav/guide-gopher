"use client";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Menu, XIcon } from "lucide-react";

import React from "react";

import Container from "@/components/container";
import { Magnetic } from "@/components/motion/magnetic";
import UserMenu from "@/components/sections/shared/user-menu";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/data/site";
import { useAuth } from "@/hooks/use-auth";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const { pathname } = useLocation();
  const header = React.useRef<HTMLElement>(null);

  /**
   * Transparent over the hero, condensed glass after scrolling, hidden while
   * scrolling down and revealed on the way back up.
   */
  React.useLayoutEffect(() => {
    const el = header.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const showTo = gsap.quickTo(el, "yPercent", { duration: 0.6, ease: EASE.micro });
      let last = window.scrollY;
      let condensed = false;

      const onScroll = () => {
        const y = window.scrollY;
        const goingDown = y > last && y > 220;
        last = y;

        showTo(goingDown ? -110 : 0);

        const shouldCondense = y > 80;
        if (shouldCondense !== condensed) {
          condensed = shouldCondense;
          el.dataset.condensed = String(condensed);
          gsap.to(el, {
            paddingTop: condensed ? 10 : 0,
            paddingBottom: condensed ? 10 : 0,
            duration: 0.5,
            ease: EASE.micro,
          });
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={header}
      data-condensed="false"
      className="w-full fixed top-0 left-0 z-40 will-change-transform bg-background/85 backdrop-blur-xl transition-colors duration-500 data-[condensed=true]:bg-background/95 data-[condensed=true]:border-b data-[condensed=true]:border-border md:pt-7 pt-5 pb-4"
    >
      <Container className="flex justify-between items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5 w-fit group" aria-label="Curtains Hub — home">
          <img
            src="/images/curtains/logo-mark.png"
            alt="Curtains Hub logo"
            width={36}
            height={36}
            className="h-8 w-8 object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <span className="text-[0.95rem] font-medium tracking-[0.22em] uppercase text-foreground">Curtains Hub</span>
        </Link>


        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          {!loading && (
            user ? (
              <UserMenu />
            ) : (
              <Button asChild size="sm" className="sweep">
                <Link to="/contact">Free Consultation</Link>
              </Button>
            )
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="cursor-pointer lg:hidden text-foreground h-11 w-11 flex items-center justify-center">
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </SheetTrigger>

            <SheetContent className="flex flex-col justify-between bg-background border-border">
              <div className="h-full flex flex-col">
                <SheetHeader className="flex flex-row justify-between border-b border-border pb-4">
                  <SheetTitle className="flex items-center">
                    <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <img src="/images/curtains/logo-mark.png" alt="Curtains Hub logo" width={28} height={28} className="h-7 w-7 object-contain" />
                      <span className="text-sm tracking-[0.18em] uppercase">Curtains Hub</span>
                    </Link>
                  </SheetTitle>
                  <SheetPrimitive.Close className="h-11 w-11 flex items-center justify-center rounded-xs opacity-70 transition-opacity hover:opacity-100">
                    <XIcon className="size-5 text-foreground" />
                    <span className="sr-only">Close menu</span>
                  </SheetPrimitive.Close>
                </SheetHeader>
                <nav aria-label="Mobile" className="px-2 py-6 flex flex-col gap-2 overflow-y-auto">
                  {navLinks.map((page) => (
                    <Link
                      key={page.href}
                      to={page.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={pathname === page.href ? "page" : undefined}
                      className="block py-2 min-h-11 text-muted-foreground hover:text-primary aria-[current=page]:text-primary transition-colors">
                      {page.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop */}
        <NavigationMenu className="hidden lg:block mx-auto" aria-label="Primary">
          <NavigationMenuList className="gap-1">
            {navLinks.map((page) => (
              <NavigationMenuItem key={page.href}>
                <NavigationMenuLink asChild>
                  <Link
                    to={page.href}
                    data-active={pathname === page.href}
                    aria-current={pathname === page.href ? "page" : undefined}
                    className="nav-link px-3 py-2 text-foreground hover:text-primary data-[active=true]:text-primary transition-colors"
                  >
                    {page.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex gap-2 items-center w-fit justify-end">
          {!loading && (
            user ? (
              <UserMenu />
            ) : (
              <Magnetic strength={8}>
                <Button asChild className="sweep">
                  <Link to="/contact">Book a Free Consultation</Link>
                </Button>
              </Magnetic>
            )
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
