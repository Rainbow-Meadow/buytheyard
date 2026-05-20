import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { lazy, Suspense } from "react";
const CookieConsent = lazy(() =>
  import("@/components/site/CookieConsent").then((m) => ({ default: m.CookieConsent })),
);
import { SplashScreen } from "@/components/site/SplashScreen";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-3 md:mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-3 md:mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0c0c0e" },
      { title: "Buy The Yard — Mulch, Loam, Sand & Stone in Jefferson, MA" },
      { name: "description", content: "Woman-owned bulk landscape supply yard in Jefferson, MA. Premium mulch, loam, sand, gravel, and specialty stone for pickup or delivery. Call 508-579-9897." },
      { name: "author", content: "Buy The Yard" },
      { property: "og:title", content: "Buy The Yard — Mulch, Loam, Sand & Stone in Jefferson, MA" },
      { property: "og:description", content: "Woman-owned bulk landscape supply yard in Jefferson, MA. Premium mulch, loam, sand, gravel, and specialty stone for pickup or delivery. Call 508-579-9897." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Buy The Yard" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/4e2e9457-180d-4029-9ce7-8b606bb36341" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Buy The Yard — Jefferson, MA landscape supply yard" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/4e2e9457-180d-4029-9ce7-8b606bb36341" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Buy The Yard — Mulch, Loam, Sand & Stone in Jefferson, MA" },
      { name: "twitter:description", content: "Woman-owned bulk landscape supply yard in Jefferson, MA. Premium mulch, loam, sand, gravel, and specialty stone for pickup or delivery. Call 508-579-9897." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://buytheyard.lovable.app/#website",
              url: "https://buytheyard.lovable.app/",
              name: "Buy The Yard",
              publisher: { "@id": "https://buytheyard.lovable.app/#organization" },
            },
            {
              "@type": "LandscapingBusiness",
              "@id": "https://buytheyard.lovable.app/#organization",
              name: "Buy The Yard",
              alternateName: "Buy The Yard Material",
              description:
                "Woman-owned bulk landscape supply yard serving Central Massachusetts with mulch, loam, sand, gravel, specialty stone, playground chips, and a garden center.",
              url: "https://buytheyard.lovable.app/",
              telephone: "+1-508-579-9897",
              email: "abby@btymaterial.com",
              image: "https://buytheyard.lovable.app/og/og-home.jpg",
              logo: "https://buytheyard.lovable.app/brandmark.webp",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2264 Main St.",
                addressLocality: "Jefferson",
                addressRegion: "MA",
                postalCode: "01522",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 42.3837,
                longitude: -71.8870,
              },
              hasMap: "https://maps.google.com/?q=Buy+The+Yard+2264+Main+St+Jefferson+MA+01522",
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "15:00" },
              ],
              areaServed: [
                { "@type": "City", name: "Jefferson, MA" },
                { "@type": "City", name: "Holden, MA" },
                { "@type": "City", name: "Worcester, MA" },
                { "@type": "City", name: "Princeton, MA" },
                { "@type": "City", name: "Sterling, MA" },
                { "@type": "City", name: "Rutland, MA" },
                { "@type": "City", name: "Paxton, MA" },
                { "@type": "City", name: "West Boylston, MA" },
                { "@type": "City", name: "Boylston, MA" },
                { "@type": "City", name: "Leominster, MA" },
                { "@type": "City", name: "Clinton, MA" },
                { "@type": "City", name: "Lancaster, MA" },
                { "@type": "City", name: "Spencer, MA" },
                { "@type": "City", name: "Auburn, MA" },
                { "@type": "City", name: "Shrewsbury, MA" },
                {
                  "@type": "GeoCircle",
                  geoMidpoint: { "@type": "GeoCoordinates", latitude: 42.3837, longitude: -71.8870 },
                  geoRadius: "40000",
                },
              ],
              makesOffer: [
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bulk mulch (premium black, hemlock, dark brown)" } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Screened loam, compost, and plant mix" } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mason sand, crushed stone, and pea gravel" } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Specialty stone (river stone, lava rock)" } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "ASTM certified playground chips" } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Annuals, perennials, and hanging baskets" } },
              ],
              sameAs: [
                "https://www.facebook.com/BuyTheYardOutdoorProducts",
                "https://www.yelp.com/biz/buy-the-yard-holden",
              ],
            },
          ],
        }),
      },
      // Attach Google Fonts stylesheet non-blockingly: preload above warms the
      // request; this script swaps it to an applied stylesheet once parsed.
      {
        children:
          "(function(){var h='https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap';var l=document.createElement('link');l.rel='stylesheet';l.href=h;l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l);})();",
      },
    ],
    links: [
      { rel: "icon", type: "image/webp", href: "/brandmark.webp" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      // iOS PWA launch images (apple-touch-startup-image)
      ...[
        { w: 1024, h: 1366, dpr: 2, file: "2048x2732" }, // iPad Pro 12.9"
        { w: 834,  h: 1194, dpr: 2, file: "1668x2388" }, // iPad Pro 11"
        { w: 768,  h: 1024, dpr: 2, file: "1536x2048" }, // iPad 9.7"
        { w: 430,  h: 932,  dpr: 3, file: "1290x2796" }, // iPhone 15/16 Pro Max
        { w: 393,  h: 852,  dpr: 3, file: "1179x2556" }, // iPhone 15/16
        { w: 390,  h: 844,  dpr: 3, file: "1170x2532" }, // iPhone 13/14
        { w: 375,  h: 812,  dpr: 3, file: "1125x2436" }, // iPhone X/XS/11 Pro
      ].flatMap(({ w, h, dpr, file }) => {
        const [pw, ph] = file.split("x");
        return [
          {
            rel: "apple-touch-startup-image",
            href: `/splash/apple-splash-${pw}x${ph}.png`,
            media: `(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`,
          },
          {
            rel: "apple-touch-startup-image",
            href: `/splash/apple-splash-${ph}x${pw}.png`,
            media: `(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: landscape)`,
          },
        ];
      }),
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      // Preload + non-blocking attach (see scripts[] below). Without JS the
      // browser still resolves the preload; the inline script promotes it to
      // an applied stylesheet on parse.
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-base text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <ChatLauncher />
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
        <SplashScreen />
      </div>
    </QueryClientProvider>
  );
}
