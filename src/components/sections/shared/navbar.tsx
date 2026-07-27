"use client";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Menu, XIcon } from "lucide-react";

import React from "react";

import Container from "@/components/container";
import UserMenu from "@/components/sections/shared/user-menu";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/data/site";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="w-full md:top-10 top-6 mx-auto absolute z-40">
      <Container className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 w-fit" aria-label="Curtains Hub — home">
          <img src="/images/curtains/logo-mark.png" alt="Curtains Hub logo" width={40} height={40} className="h-9 w-9 object-contain" />
          <span className="text-lg font-medium tracking-[0.18em] uppercase text-foreground">Curtains Hub</span>
        </Link>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          {!loading && (
            user ? (
              <UserMenu />
            ) : (
              <Button asChild size="sm">
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
                      className="block py-2 min-h-11 text-muted-foreground hover:text-primary transition-colors">
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
                  <Link to={page.href} className="px-3 py-2 text-foreground hover:text-primary transition-colors">
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
              <Button asChild>
                <Link to="/contact">Book a Free Consultation</Link>
              </Button>
            )
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
