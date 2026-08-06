"use client";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Menu, Search, XIcon } from "lucide-react";

import React from "react";

import Container from "@/components/container";
import { Magnetic } from "@/components/motion/magnetic";
import SiteSearch from "@/components/search/site-search";
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
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { pathname } = useLocation();
  const header = React.useRef<HTMLElement>(null);

  // ⌘K / Ctrl+K opens search from anywhere
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /**
   * Glass at all times, condensed after scrolling, hidden while scrolling
   * down and revealed on the way back up.
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
    <>
      <header
        ref={header}
        data-condensed="false"
        className="w-full fixed top-0 left-0 z-40 will-change-transform bg-background/60 supports-[backdrop-filter]:bg-background/50 backdrop-blur-2xl backdrop-saturate-150 border-b border-border/50 transition-colors duration-500 data-[condensed=true]:bg-background/85 data-[condensed=true]:border-border pt-4 pb-4 md:pt-6 md:pb-6"
      >
        <Container className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
          <Link to="/" className="flex items-center w-fit group shrink-0" aria-label="Curtains Hub — home">
            <img
              src="/images/curtains/logo.svg"
              alt="Curtains Hub — luxury curtains in Kigali, Rwanda"
              width={40}
              height={40}
              className="h-10 w-10 object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <NavigationMenu className="hidden lg:flex justify-center" aria-label="Primary">
            <NavigationMenuList className="flex items-center gap-1">
              {navLinks.map((page) => (
                <NavigationMenuItem key={page.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={page.href}
                      data-active={pathname === page.href}
                      aria-current={pathname === page.href ? "page" : undefined}
                      className="nav-link flex items-center h-10 px-3 text-sm font-normal tracking-[0.01em] text-foreground/80 hover:text-foreground data-[active=true]:text-foreground transition-colors"
                    >
                      {page.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop: search field + CTA */}
          <div className="hidden lg:flex gap-3 items-center w-fit justify-end">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the website"
              className="group flex items-center gap-2.5 h-10 w-[200px] border border-border bg-background/70 px-3 text-left text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="text-sm font-normal truncate">Search</span>
              <kbd className="ml-auto text-[0.65rem] font-medium tracking-wider text-muted-foreground">⌘K</kbd>
            </button>

            {!loading && (
              user ? (
                <UserMenu />
              ) : (
                <Magnetic strength={8}>
                  <Button asChild size="sm" className="sweep h-10 font-medium">
                    <Link to="/contact">Book a Free Consultation</Link>
                  </Button>
                </Magnetic>
              )
            )}
          </div>


          {/* Mobile: search icon + menu */}
          <div className="flex items-center justify-end gap-1 lg:hidden col-start-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the website"
              className="h-11 w-11 flex items-center justify-center text-foreground"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

            {!loading && user && <UserMenu />}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="cursor-pointer lg:hidden text-foreground h-11 w-11 flex items-center justify-center">
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </button>
              </SheetTrigger>

              <SheetContent className="flex flex-col justify-between bg-background/95 backdrop-blur-2xl border-border">
                <div className="h-full flex flex-col">
                  <SheetHeader className="flex flex-row justify-between border-b border-border pb-4">
                    <SheetTitle className="flex items-center">
                      <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)} aria-label="Curtains Hub — home">
                        <img src="/images/curtains/logo.svg" alt="Curtains Hub logo" width={32} height={32} className="h-8 w-8 object-contain" />
                      </Link>
                    </SheetTitle>
                    <SheetPrimitive.Close className="h-11 w-11 flex items-center justify-center opacity-70 transition-opacity hover:opacity-100">
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
                        className="flex py-2 min-h-11 items-center text-[1.05rem] font-normal text-foreground/75 hover:text-foreground aria-[current=page]:text-foreground transition-colors">
                        {page.title}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* CTA lives inside the drawer on mobile */}
                <div className="px-2 pb-4 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      setSearchOpen(true);
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                    Search the site
                  </Button>
                  <Button asChild className="w-full sweep">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>Book a Free Consultation</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </header>

      <SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Navbar;
