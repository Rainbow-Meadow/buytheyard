import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function InlineCTA({
  to,
  href,
  children,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
}) {
  const cls = "inline-flex items-center group";
  const inner = (
    <>
      <span className="font-bebas text-2xl tracking-wide border-b-2 border-current pb-1">
        {children}
      </span>
      <span className="ml-4 text-2xl transition-transform group-hover:translate-x-2">
        →
      </span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href ?? "#"} className={cls}>{inner}</a>;
}
