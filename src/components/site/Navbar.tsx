import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "#how", label: "How it works" },
    { href: "#performance", label: "Performance" },
    { href: "#features", label: "Features" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
<div className={`pointer-events-auto transition-all duration-500 ${scrolled ? "pt-2 sm:pt-3" : "pt-3 sm:pt-5"}`}>
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className={`relative flex items-center justify-between gap-2 rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 transition-all duration-500
            ${scrolled
              ? "bg-ink/80 backdrop-blur-xl border border-white/10 shadow-elevated"
              : "bg-white/[0.04] backdrop-blur-md border border-white/10"}`}>
            {/* Glow underline */}
            <div className="pointer-events-none absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.2_235/0.7)] to-transparent" />

            <a href="#top" className="flex items-center gap-2 sm:gap-2.5 text-white group min-w-0">
              <div className="leading-tight min-w-0">
                <div className="font-display font-bold tracking-tight text-[14px] sm:text-[15px] truncate">FXG ALPHA</div>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-1 text-sm text-white/70 absolute left-1/2 -translate-x-1/2">
              {links.map((l) => (
                <a key={l.href} href={l.href}
                   className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-smooth">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <Button asChild variant="hero" size="sm" className="relative overflow-hidden animate-shine text-xs sm:text-sm px-3 sm:px-4 hidden sm:inline-flex">
                <a href="#claim">Get Started</a>
              </Button>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/10 transition-smooth"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden pointer-events-auto fixed inset-0 top-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className={`relative h-full flex flex-col pt-28 px-6 transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-4"}`}>
          <nav className="flex flex-col gap-1 text-lg">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-white/85 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-smooth"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="hero" size="lg" className="relative overflow-hidden animate-shine">
              <a href="#claim" onClick={() => setOpen(false)}>Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
