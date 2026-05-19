import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";

const NAV = [
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/delivery", label: "Delivery" },
  { to: "/quote", label: "Get a Quote" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-base/85 backdrop-blur-md border-b border-white/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6 h-14 md:h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 md:gap-12">
          <Link
            to="/"
            className="flex items-center leading-none"
            aria-label="Buy The Yard — home"
            onClick={() => setOpen(false)}
          >
            <span className="display-5 text-white tracking-tight">
              Buy<span className="text-brand">/</span>The<span className="text-brand">/</span>Yard
            </span>
          </Link>
          <nav className="hidden md:flex gap-7">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                activeProps={{ className: "text-white" }}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 right-0 mx-auto h-px w-0 group-hover:w-full bg-brand transition-all duration-300"
                />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:5085799897"
            aria-label="Call Buy The Yard at 508-579-9897"
            className="btn-ember inline-flex items-center gap-2 bg-brand text-brand-foreground h-9 md:h-10 pl-2 pr-3 md:pr-4 rounded-sm"
          >
            <span className="p-1 bg-white/20 rounded-xs shrink-0">
              <Phone className="size-3.5" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold tracking-tight hidden sm:inline mono">
              508.579.9897
            </span>
            <ArrowUpRight className="size-3.5 hidden md:inline -mr-0.5 opacity-80" />
          </a>
          <button
            type="button"
            className="md:hidden p-2 text-zinc-100"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden bg-base border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="display-5 text-zinc-200 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}