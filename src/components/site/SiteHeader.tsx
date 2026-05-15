import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";

const NAV = [
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/delivery", label: "Delivery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="font-display text-3xl tracking-tighter text-surface-foreground uppercase leading-none"
            onClick={() => setOpen(false)}
          >
            Buy The <span className="text-brand">Yard</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
                activeProps={{ className: "text-zinc-100" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:5085799897"
            className="inline-flex items-center gap-2 bg-brand text-brand-foreground py-2 pr-3 pl-2 rounded-sm hover:opacity-90 transition-opacity"
          >
            <span className="p-1 bg-white/15 rounded-xs shrink-0">
              <Phone className="size-4" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold tracking-tight hidden sm:inline">
              508.579.9897
            </span>
          </a>
          <button
            type="button"
            className="md:hidden p-2 text-zinc-200"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden bg-surface border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-base font-medium text-zinc-300 hover:text-zinc-100"
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