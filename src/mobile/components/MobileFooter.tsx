import { Link } from "@tanstack/react-router";
import { mBrand } from "../copy";

export function MobileFooter() {
  return (
    <footer className="px-5 pt-10 pb-8 border-t border-m-line mt-12">
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Link to="/m" className="m-card p-4 text-center text-xs font-semibold">Home</Link>
        <Link to="/m/shop" className="m-card p-4 text-center text-xs font-semibold">Shop</Link>
        <Link to="/m/contact" className="m-card p-4 text-center text-xs font-semibold">Contact</Link>
      </div>
      <p className="text-xs text-m-muted text-center mb-2">{mBrand.address}</p>
      <p className="text-[10px] uppercase tracking-[0.3em] text-m-gold/50 text-center">
        © {new Date().getFullYear()} Buy The Yard
      </p>
    </footer>
  );
}