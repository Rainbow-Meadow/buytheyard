import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Masthead } from "@/components/site/Masthead";

const NAV = [
  { to: "/", label: "Front Page" },
  { to: "/products", label: "Catalog" },
  { to: "/delivery", label: "Delivery" },
  { to: "/service-area", label: "Service Area" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-newsprint">
      <Masthead />

      {/* Nameplate row */}
      <div className="bg-newsprint border-y border-rule-strong">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex flex-col leading-none"
            aria-label="The Yard Gazette — home"
            onClick={() => setOpen(false)}
          >
            <span className="masthead text-ink">The Yard Gazette</span>
            <span className="meta text-ink-soft mt-1">
              Buy The Yard Material · Est. 2016 · 508.579.9897
            </span>
          </Link>
          <a
            href="tel:5085799897"
            aria-label="Call Buy The Yard at 508-579-9897"
            className="hidden sm:inline-flex items-center gap-2 bg-stamp text-newsprint label px-4 py-2.5 btn-press hover:bg-ink"
          >
            <Phone className="size-4" strokeWidth={2.5} />
            508.579.9897
          </a>
          <button
            type="button"
            className="md:hidden p-2 text-ink"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Nav rail */}
      <nav className="hidden md:block bg-newsprint border-b border-rule-strong">
        <ul className="max-w-7xl mx-auto px-5 md:px-8 flex items-stretch divide-x divide-rule">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block label text-ink-soft hover:text-stamp transition-colors py-3 px-5"
                activeProps={{ className: "text-stamp" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-newsprint border-b border-rule-strong">
          <ul className="px-5 py-4 flex flex-col divide-y divide-rule">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block label text-ink py-3"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="tel:5085799897"
                className="block bg-stamp text-newsprint label py-3 text-center btn-press"
              >
                Call 508.579.9897
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}