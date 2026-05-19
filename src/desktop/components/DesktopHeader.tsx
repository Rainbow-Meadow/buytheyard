import { Link } from "@tanstack/react-router";
import { brand } from "../copy";

const NAV = [
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/delivery", label: "Delivery" },
  { to: "/contact", label: "Contact" },
] as const;

export function DesktopHeader() {
  return (
    <nav className="flex justify-between items-center border-b border-d-line pb-8 mb-12">
      <Link to="/" className="flex items-baseline gap-1 leading-none">
        <span className="d-serif text-3xl text-d-gold-light">Buy</span>
        <span className="d-serif text-3xl italic text-d-text">The</span>
        <span className="d-serif text-3xl text-d-gold">Yard</span>
      </Link>
      <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.25em] font-medium text-d-gold-light/80">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="hover:text-d-gold-light transition-colors"
            activeProps={{ className: "text-d-gold-light" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden lg:block text-right">
          <p className="text-[10px] uppercase tracking-widest text-d-gold mb-1">Jefferson, MA</p>
          <a href={`tel:${brand.phoneTel}`} className="text-sm font-medium tracking-wider text-d-text">
            {brand.phone}
          </a>
        </div>
        <Link to="/quote" className="d-btn">Get a Quote</Link>
      </div>
    </nav>
  );
}