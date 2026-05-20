import { useCallback, useEffect, useState } from "react";

/** Sync a Dialog's open state with `?tile=<shareId>` in the URL so the
 *  dialog can be linked to and reopened by navigating to the URL.
 *
 *  Shared by `Tile` image dialogs and `ProductCard` dialogs — both reuse
 *  the same `tile` URL namespace so deep links coexist. */
export function useTileDeepLink(shareId: string | undefined) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!shareId || typeof window === "undefined") return;
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      setOpen(params.get("tile") === shareId);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [shareId]);

  const update = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!shareId || typeof window === "undefined") return;
      const url = new URL(window.location.href);
      if (next) {
        url.searchParams.set("tile", shareId);
      } else if (url.searchParams.get("tile") === shareId) {
        url.searchParams.delete("tile");
      }
      window.history.replaceState({}, "", url.toString());
    },
    [shareId],
  );

  return [open, update] as const;
}