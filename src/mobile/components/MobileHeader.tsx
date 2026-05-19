import { Link } from "@tanstack/react-router";
import { mBrand } from "../copy";
import brandmark from "@/assets/brandmark.png";

export function MobileHeader() {
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-m-line">
      <Link to="/m" className="leading-none">
        <img src={brandmark} alt="Buy The Yard" className="h-8 w-auto" />
      </Link>
      <a href={`tel:${mBrand.phoneTel}`} className="m-btn-ghost !w-auto !py-2 !px-4 text-xs">
        Call
      </a>
    </header>
  );
}