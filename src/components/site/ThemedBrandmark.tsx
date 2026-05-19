import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import brandmarkLight from "@/assets/brandmark.png";
import brandmarkDark from "@/assets/brandmark-dark.png";

type Tone = "light" | "dark";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  /** Override auto-detection. "auto" measures the nearest opaque ancestor's background. */
  tone?: Tone | "auto";
};

/**
 * Renders the Buy The Yard brandmark, swapping between the light- and
 * dark-background variants based on the actual background luminance of the
 * nearest opaque ancestor. SSR / first paint uses the dark-bg variant since
 * the header and footer surfaces are dark today.
 */
export function ThemedBrandmark({ tone = "auto", alt = "Buy The Yard", ...rest }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [resolved, setResolved] = useState<Tone>(tone === "auto" ? "dark" : tone);

  useEffect(() => {
    if (tone !== "auto") {
      setResolved(tone);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const detect = () => {
      const luminance = nearestOpaqueLuminance(el);
      // Below ~50% perceived lightness → use the dark-bg (light-ink) mark.
      setResolved(luminance < 0.5 ? "dark" : "light");
    };

    detect();
    // Re-check if the user toggles a theme class on <html>.
    const observer = new MutationObserver(detect);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, [tone]);

  return (
    <img
      ref={ref}
      src={resolved === "dark" ? brandmarkDark : brandmarkLight}
      alt={alt}
      {...rest}
    />
  );
}

/** Walk up the DOM and return relative luminance (0–1) of the first non-transparent background. */
function nearestOpaqueLuminance(start: HTMLElement): number {
  let node: HTMLElement | null = start.parentElement;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const rgba = parseColor(bg);
    if (rgba && rgba.a > 0.1) return relativeLuminance(rgba.r, rgba.g, rgba.b);
    node = node.parentElement;
  }
  // Fall back to document background (or white if unset).
  const docBg = parseColor(getComputedStyle(document.body).backgroundColor);
  return docBg ? relativeLuminance(docBg.r, docBg.g, docBg.b) : 1;
}

function parseColor(value: string): { r: number; g: number; b: number; a: number } | null {
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  if (parts.length < 3) return null;
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}