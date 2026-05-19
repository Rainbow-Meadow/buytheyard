import { Link } from "@tanstack/react-router";
import { brand } from "../copy";

export function DesktopFooter() {
  return (
    <footer className="border-t border-d-line mt-20 pt-12 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-baseline gap-1 leading-none mb-4">
            <span className="d-serif text-2xl text-d-gold-light">Buy</span>
            <span className="d-serif text-2xl italic">The</span>
            <span className="d-serif text-2xl text-d-gold">Yard</span>
          </div>
          <p className="text-sm text-d-muted leading-relaxed">
            Woman-owned bulk landscape supply, est. 1998. Jefferson, MA.
          </p>
        </div>
        <div>
          <p className="d-eyebrow mb-4">Visit</p>
          <p className="text-sm text-d-muted leading-relaxed">{brand.address}</p>
          <a href={`tel:${brand.phoneTel}`} className="block mt-3 text-sm tracking-wider text-d-text">
            {brand.phone}
          </a>
        </div>
        <div>
          <p className="d-eyebrow mb-4">Hours</p>
          <ul className="space-y-1 text-sm text-d-muted">
            {brand.hours.map((h) => (
              <li key={h.day} className="flex justify-between max-w-[180px]">
                <span>{h.day}</span>
                <span className="text-d-text">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="d-eyebrow mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/about", label: "About" },
              { to: "/delivery", label: "Delivery" },
              { to: "/quote", label: "Get a Quote" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-d-muted hover:text-d-gold-light transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-d-line flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-d-gold/40">
        <span>© {new Date().getFullYear()} Buy The Yard</span>
        <span>Jefferson, MA · 01522</span>
      </div>
    </footer>
  );
}