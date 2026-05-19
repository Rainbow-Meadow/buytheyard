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
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CookieConsent } from "@/components/site/CookieConsent";

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
              logo: "https://buytheyard.lovable.app/brandmark.png",
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
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/brandmark.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "stylesheet",
        href: appCss,
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
        <ChatWidget />
        <CookieConsent />
      </div>
    </QueryClientProvider>
  );
}
