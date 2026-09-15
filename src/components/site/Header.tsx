import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark, Wordmark } from "./ornaments";
import { SocialLinks } from "./SocialLinks";

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Reservation", href: "#reservation" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled
          ? "bg-ink/95 backdrop-blur-sm border-b border-gold/40 shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:py-5">
        <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Lebanon Chef home">
          <LogoMark />
          <Wordmark compact />
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="link-gold text-[0.78rem] font-medium tracking-[0.2em] uppercase text-ivory/85 hover:text-gold-light transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SocialLinks />
        </div>

        <button
          type="button"
          className="ring-gold-hover grid h-11 w-11 place-items-center rounded-full text-ivory lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile fullscreen panel */}
      <div
        className={cn(
          "bg-khatam fixed inset-0 z-[60] flex flex-col bg-ink transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="relative flex items-center justify-between px-5 py-4">
          <a href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <LogoMark />
            <Wordmark compact />
          </a>
          <button
            type="button"
            className="ring-gold-hover grid h-11 w-11 place-items-center rounded-full text-ivory"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mx-5 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" />
        <nav className="relative flex flex-1 flex-col items-center justify-center gap-7" aria-label="Mobile">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={cn(
                "font-display text-4xl text-ivory transition-all duration-500 hover:text-gold-light",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {n.label}
            </a>
          ))}
          <div className="mt-4 flex items-center gap-2">
            <SocialLinks />
          </div>
        </nav>
        <div className="relative pb-10 text-center text-xs tracking-[0.3em] text-sand-muted">
          NO. 56, GALLE ROAD · COLOMBO 03
        </div>
      </div>
    </header>
  );
}
