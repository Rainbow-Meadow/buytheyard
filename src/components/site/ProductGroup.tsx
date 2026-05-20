import type { ReactNode } from "react";
import type { Product } from "@/data/products";
import { productSlug } from "@/data/products";
import { TileGroupProvider } from "./TileGroupContext";

/** Wrap a rendered set of `<ProductCard />`s in a TileGroup so the
 *  expandable dialog's prev/next nav cycles within just those products. */
export function ProductGroup({
  products,
  children,
}: {
  products: Product[];
  children: ReactNode;
}) {
  const ids = products.map((p) => `product-${productSlug(p.name)}`);
  return <TileGroupProvider ids={ids}>{children}</TileGroupProvider>;
}