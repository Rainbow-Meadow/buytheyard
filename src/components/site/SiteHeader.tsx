import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/site/Wordmark";

const NAV = [
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/delivery", label: "Delivery" },
  { to: "/quote", label: "Get a Quote" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-white/5">
      <div className="relative border-l-[1.5px] border-brand">
        <div className="max-w-7xl mx-auto pl-5 pr-3 md:pl-8 md:pr-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-5 md:gap-12">
            <Wordmark asLink onClick={() => setOpen(false)} withTagline />
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative label text-kraft/60 hover:text-kraft transition-colors"
                  activeProps={{ className: "text-kraft" }}
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      <span
                        aria-hidden
                        className={`absolute -bottom-2 left-0 h-0.5 w-6 bg-brand transition-opacity ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    </>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:5085799897"
              aria-label="Call Buy The Yard at 508-579-9897"
              className="group inline-flex items-center gap-2 bg-brand text-kraft pl-2 pr-3 h-10 hover:bg-kraft hover:text-surface transition-colors"
            >
              <span className="p-1 bg-white/15 group-hover:bg-brand/15 transition-colors shrink-0">
                <Phone className="size-4 group-hover:text-brand transition-colors" strokeWidth={2.5} />
              </span>
              <span className="label hidden sm:inline">508.579.9897</span>
            </a>
            <button
              type="button"
              className="md:hidden p-2 text-kraft"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="md:hidden bg-surface border-t border-white/10">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between gap-3 pl-5 pr-4 h-14 border-b border-white/5 text-kraft/80 hover:text-kraft hover:bg-white/[0.02] transition-colors"
                activeProps={{ className: "text-kraft bg-white/[0.03]" }}
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-6 bg-brand" />
                  <span className="label">{item.label}</span>
                </span>
                <ChevronRight className="size-4 text-brand/70 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}