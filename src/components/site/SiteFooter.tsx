import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Facebook } from "lucide-react";
import { YelpLogo } from "@/components/site/YelpLogo";
import { Wordmark } from "@/components/site/Wordmark";
import { openCookieSettings } from "@/lib/cookie-consent";

// TODO: replace with the real Google review short link from the
// Google Business Profile dashboard (looks like https://g.page/r/...).
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=REPLACE_ME";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=2264+Main+St,+Jefferson,+MA+01522&output=embed";
const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=2264+Main+St,+Jefferson,+MA+01522";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-px w-6 bg-brand" />
      <span className="eyebrow text-brand">{children}</span>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface text-kraft border-t border-white/10">
      <div className="border-l-[1.5px] border-brand">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Column 1 — Identity + WBE */}
            <div className="space-y-10">
              <div className="space-y-4">
                <Wordmark size="lg" withTagline />
                <p className="meta text-kraft/50 flex items-center gap-2">
                  <span>Est. 2016</span>
                  <span aria-hidden className="size-1 rounded-full bg-brand" />
                  <span>WBE Certified</span>
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <Eyebrow>Certification</Eyebrow>
                <Link
                  to="/wbe"
                  className="group flex items-start gap-4 -m-2 p-2 hover:bg-white/[0.02] transition-colors"
                >
                  <BadgeCheck className="size-10 text-brand shrink-0" aria-hidden="true" />
                  <div className="space-y-2">
                    <p className="display-5 text-kraft group-hover:text-brand transition-colors">Certified Woman-Owned</p>
                    <p className="body-sm text-kraft/70 max-w-[28ch]">
                      Certified by the Commonwealth of Massachusetts since 2018.
                    </p>
                  </div>
                </Link>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    to="/wbe"
                    className="inline-flex items-center gap-2 label text-kraft hover:text-brand transition-colors"
                  >
                    What WBE means <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 label text-kraft/70 hover:text-kraft transition-colors"
                  >
                    Meet Abby <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2 — Hours + Visit */}
            <div className="space-y-10">
              <div className="space-y-4">
                <Eyebrow>Hours</Eyebrow>
                <ul className="body-sm space-y-1.5 max-w-[32ch]">
                  <li className="flex justify-between gap-4">
                    <span className="label text-kraft/50">Mon – Fri</span>
                    <span className="text-kraft">8:00am – 5:00pm</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="label text-kraft/50">Saturday</span>
                    <span className="text-kraft">8:00am – 3:00pm</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="label text-kraft/50">Sunday</span>
                    <span className="text-brand">Closed</span>
                  </li>
                </ul>
                <div className="space-y-1 pt-2">
                  <a
                    href="tel:5085799897"
                    className="block display-5 text-brand hover:text-kraft transition-colors"
                  >
                    508.579.9897
                  </a>
                  <a
                    href="mailto:abby@btymaterial.com"
                    className="block body-sm text-kraft/70 hover:text-kraft transition-colors"
                  >
                    abby@btymaterial.com
                  </a>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <Eyebrow>Visit</Eyebrow>
                <address className="not-italic body-sm text-kraft/80 leading-relaxed">
                  2264 Main St.
                  <br />
                  Jefferson, MA 01522
                </address>
                <div className="w-full aspect-video ring-1 ring-white/10 overflow-hidden">
                  <iframe
                    src={MAP_EMBED_URL}
                    title="Buy The Yard Material, 2264 Main St, Jefferson, MA"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[0.2] contrast-[1.05]"
                    style={{ border: 0 }}
                  />
                </div>
                <a
                  href={MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 label text-kraft hover:text-brand transition-colors"
                >
                  Get directions <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            {/* Column 3 — Community + Site */}
            <div className="space-y-10">
              <div className="relative space-y-4 ring-1 ring-white/10 p-6">
                <span aria-hidden="true" className="absolute left-0 inset-y-0 w-[1.5px] bg-brand" />
                <Eyebrow>Feedback</Eyebrow>
                <h2 className="display-5 text-kraft">
                  Leave a Google review.
                </h2>
                <p className="body-sm text-kraft/70">
                  Reviews from Central Mass neighbors mean a lot to me.
                </p>
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand text-brand-foreground px-6 h-10 label hover:opacity-90 transition-opacity"
                >
                  Write a Google review
                  <ArrowRight className="size-4" />
                </a>
                <div className="flex items-center gap-5 pt-1">
                  <a
                    href="https://www.facebook.com/Buy-The-Yard-Outdoor-Products-546148285792835/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 label text-kraft/70 hover:text-kraft transition-colors"
                  >
                    <Facebook className="size-4" /> Facebook
                  </a>
                  <a
                    href="https://www.yelp.com/biz/buy-the-yard-holden"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 label text-kraft/70 hover:text-kraft transition-colors"
                  >
                    <YelpLogo className="size-4" /> Yelp
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <Eyebrow>Site</Eyebrow>
                <nav className="grid grid-cols-2 gap-x-4 gap-y-3 justify-items-start">
                  <Link to="/products" className="label text-kraft/70 hover:text-kraft transition-colors">Products</Link>
                  <Link to="/about" className="label text-kraft/70 hover:text-kraft transition-colors">About</Link>
                  <Link to="/delivery" className="label text-kraft/70 hover:text-kraft transition-colors">Delivery</Link>
                  <Link to="/service-area" className="label text-kraft/70 hover:text-kraft transition-colors">Service Area</Link>
                  <Link to="/contact" className="label text-kraft/70 hover:text-kraft transition-colors">Contact</Link>
                  <Link to="/wbe" className="label text-kraft/70 hover:text-kraft transition-colors">WBE</Link>
                  <Link to="/privacy" className="label text-kraft/40 hover:text-kraft transition-colors">Privacy</Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Legal bar */}
          <div className="mt-12 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-y-3 items-center micro text-kraft/40">
            <span>
              &copy; {year} Buy The Yard Material · Jefferson, MA · Licensed & insured · MA HIC #214009 · USDOT #3543587 · WBE Certified
            </span>
            <span className="flex items-center md:justify-end gap-4 text-kraft/30">
              <button
                type="button"
                onClick={openCookieSettings}
                className="hover:text-kraft transition-colors cursor-pointer"
              >
                Cookie settings
              </button>
              <span aria-hidden>·</span>
              <span>Designed by Patrick Berthiaume</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
