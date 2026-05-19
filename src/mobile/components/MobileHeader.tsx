import { Link } from "@tanstack/react-router";
import { mBrand } from "../copy";

export function MobileHeader() {
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-m-line">
      <Link to="/m" className="m-display text-xl text-m-gold-light">BTY</Link>
      <a href={`tel:${mBrand.phoneTel}`} className="m-btn-ghost !w-auto !py-2 !px-4 text-xs">
        Call
      </a>
    </header>
  );
}