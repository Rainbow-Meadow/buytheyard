import { createContext, useContext, type ReactNode } from "react";

type TileGroup = { ids: string[] };

const TileGroupCtx = createContext<TileGroup | null>(null);

export function TileGroupProvider({
  ids,
  children,
}: {
  ids: string[];
  children: ReactNode;
}) {
  return (
    <TileGroupCtx.Provider value={{ ids }}>{children}</TileGroupCtx.Provider>
  );
}

/** Navigate to the previous/next sibling in the current group by rewriting
 *  the `?tile=` URL param. Dispatches `popstate` so `useTileDeepLink` in
 *  every mounted tile/product dialog sees the change and the open dialog
 *  swaps to the new one. */
export function useTileGroupNav(shareId: string | undefined) {
  const group = useContext(TileGroupCtx);
  if (!group || !shareId) {
    return {
      prev: () => {},
      next: () => {},
      hasPrev: false,
      hasNext: false,
    };
  }
  const idx = group.ids.indexOf(shareId);
  const hasPrev = idx > 0;
  const hasNext = idx >= 0 && idx < group.ids.length - 1;
  const go = (id: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tile", id);
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return {
    prev: () => {
      if (hasPrev) go(group.ids[idx - 1]);
    },
    next: () => {
      if (hasNext) go(group.ids[idx + 1]);
    },
    hasPrev,
    hasNext,
  };
}