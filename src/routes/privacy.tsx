import { createFileRoute } from "@tanstack/react-router";
import yardPiles from "@/assets/source/yard-piles.webp";
import { Tile, type TileBlock } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy & Terms — Buy The Yard Materials" },
      {
        name: "description",
        content:
          "Privacy policy, SMS terms, and website terms of use for Buy The Yard Materials in Jefferson, MA.",
      },
      { property: "og:title", content: "Privacy Policy & Terms — Buy The Yard Materials" },
      {
        property: "og:description",
        content:
          "Privacy policy, SMS terms, and website terms of use for Buy The Yard Materials in Jefferson, MA.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/privacy" },
    ],
  }),
  component: PrivacyPage,
});

const LAST_UPDATED = "May 19, 2026";
const linkCls = "text-brand underline-offset-2 hover:underline";

/** Compact body for flip back-faces — small, dense, but readable. */
function Back({ children }: { children: React.ReactNode }) {
  return (
    <div className="body-sm text-zinc-700 leading-relaxed space-y-2 overflow-auto max-h-full">
      {children}
    </div>
  );
}

function PrivacyPage() {
  return (
    <>
      {/* Screen 1 — pageHero: title + 4 privacy flip tiles */}
      <TileScreen
        layout="pageHero"
        label="Privacy policy"
        tiles={{
          hero: (
            <Tile
              fill
              variant="image"
              src={yardPiles}
              alt="Yard piles of bulk materials"
              focal="center"
              overlay={{
                eyebrow: "Legal · last updated " + LAST_UPDATED,
                title: "Privacy & Terms.",
                body: "Plain-English summaries on the front. Tap any card to flip for the full legal text.",
                align: "bottom-left",
              }}
            />
          ),
          a: (
            <Tile
              fill
              variant="flip"
              ariaLabel="What we collect"
              front={{
                variant: "text",
                tone: "kraft",
                eyebrow: "01 · What we collect",
                title: "Name, phone, email, address.",
                body: "Only what's needed to quote and deliver.",
              }}
              back={{
                variant: "text",
                tone: "kraft",
                eyebrow: "Full clause",
                body: (
                  <Back>
                    When you call, text, email, fill out a quote or contact
                    form, or chat on the site, you may share your name, phone,
                    email, delivery address, project details, and any photos
                    or notes. We use this to respond, prepare quotes,
                    schedule pickup or delivery, and complete your order.
                    Basic technical info (browser, device, pages visited) is
                    collected automatically and is not used to identify you.
                  </Back>
                ),
              }}
            />
          ),
          b: (
            <Tile
              fill
              variant="flip"
              ariaLabel="Cookies"
              front={{
                variant: "text",
                tone: "surface",
                eyebrow: "02 · Cookies",
                title: "Essential on. Analytics & marketing off.",
                body: "Change any time from the footer link.",
              }}
              back={{
                variant: "text",
                tone: "surface",
                eyebrow: "Full clause",
                body: (
                  <Back>
                    <strong>Essential</strong> · always on. Required for the
                    site to work and to remember your cookie choice.{" "}
                    <strong>Analytics</strong> · off by default; helps us see
                    which pages are useful. <strong>Marketing</strong> · off
                    by default; reserved for ad measurement (none active).
                    Change preferences any time from the "Cookie settings"
                    link in the footer.
                  </Back>
                ),
              }}
            />
          ),
          c: (
            <Tile
              fill
              variant="flip"
              ariaLabel="How we share"
              front={{
                variant: "text",
                tone: "kraft",
                eyebrow: "03 · Sharing",
                title: "We don't sell your info.",
                body: "Shared only to fulfill your order or by law.",
              }}
              back={{
                variant: "text",
                tone: "kraft",
                eyebrow: "Full clause",
                body: (
                  <Back>
                    We do <strong>not</strong> sell, rent, or trade your
                    personal information. We share it only when needed to
                    fulfill your order (for example, with the driver
                    delivering material) or when required by law. SMS consent
                    and phone numbers are never shared for marketing.
                    Records are retained up to seven years for tax and
                    accounting purposes.
                  </Back>
                ),
              }}
            />
          ),
          d: (
            <Tile
              fill
              variant="flip"
              ariaLabel="Your choices"
              front={{
                variant: "text",
                tone: "brand",
                eyebrow: "04 · Your choices",
                title: "Access, correct, delete.",
                body: "Email abby@btymaterial.com any time.",
              }}
              back={{
                variant: "text",
                tone: "brand",
                eyebrow: "Full clause",
                body: (
                  <Back>
                    Ask us to access, correct, or delete your personal
                    information by emailing{" "}
                    <a href="mailto:abby@btymaterial.com" className={linkCls}>
                      abby@btymaterial.com
                    </a>
                    . Stop SMS any time by replying STOP. This site is not
                    directed to children under 13. We use reasonable
                    safeguards but cannot guarantee absolute security.
                  </Back>
                ),
              }}
            />
          ),
        }}
      />

      {/* Screen 2 — section04: SMS + Terms + Contact */}
      <TileScreen
        layout="section04"
        label="SMS terms, website terms, and contact"
        tiles={{
          hero: (
            <Tile
              fill
              variant="flip"
              ariaLabel="Website terms of use"
              front={{
                variant: "text",
                tone: "surface",
                eyebrow: "05 · Website terms of use",
                title: "Use the site lawfully. Prices are estimates.",
                body:
                  "Final pricing is confirmed by phone. Natural materials vary by load and season. You're responsible for choosing a safe delivery drop. Massachusetts law governs.",
              }}
              back={{
                variant: "text",
                tone: "surface",
                eyebrow: "Full terms",
                body: (
                  <Back>
                    <p><strong>Use:</strong> lawful purposes only — no scraping, bulk copying, interference, or harassment.</p>
                    <p><strong>IP:</strong> name, logo, photos, and content are owned by Buy The Yard, LLC or used with permission. Linking is fine; reproduction is not.</p>
                    <p><strong>Quotes &amp; pricing:</strong> estimates only. Final price depends on availability, delivery distance, fuel, and actual volume ordered.</p>
                    <p><strong>Product appearance:</strong> mulch, loam, stone, and sand vary in color, size, texture, and moisture from load to load.</p>
                    <p><strong>Delivery:</strong> you designate a safe, accessible drop with overhead clearance. Surfaces near the drop may show normal impact from a loaded truck.</p>
                    <p><strong>Third-party links:</strong> Facebook, Yelp, Google — we're not responsible for their content.</p>
                    <p><strong>Disclaimers:</strong> site provided "as is" without warranties to the fullest extent of law. Liability limited to direct damages; no indirect or consequential damages.</p>
                    <p><strong>Governing law:</strong> Massachusetts; disputes in Worcester County courts. Terms may change; continued use means acceptance.</p>
                  </Back>
                ),
              }}
            />
          ),
          a: (
            <Tile
              fill
              variant="flip"
              ariaLabel="SMS terms"
              front={{
                variant: "text",
                tone: "kraft",
                eyebrow: "06 · SMS terms",
                title: "Reply STOP any time.",
                body: "Msg & data rates may apply. Frequency varies by order activity.",
              }}
              back={{
                variant: "text",
                tone: "kraft",
                eyebrow: "Full SMS terms",
                body: (
                  <Back>
                    Opting into SMS (by form, phone, or in person) means you
                    agree to texts from Buy The Yard about scheduling,
                    quotes, order updates, and replies. Frequency varies.
                    Msg &amp; data rates may apply. Reply{" "}
                    <strong>STOP</strong> to opt out, <strong>HELP</strong>{" "}
                    for assistance. Carriers aren't liable for delayed or
                    undelivered messages. Consent isn't a condition of
                    purchase and isn't shared for marketing.
                  </Back>
                ),
              }}
            />
          ),
          b: (
            <Tile
              fill
              variant="text"
              tone="kraft"
              padding="sm"
              eyebrow="07 · Mailing address"
              body={
                <>
                  Buy The Yard, LLC
                  <br />
                  2264 Main St.
                  <br />
                  Jefferson, MA 01522
                </>
              }
            />
          ),
          c: (
            <Tile
              fill
              variant="cta"
              tone="brand"
              padding="sm"
              eyebrow="08 · Questions?"
              title="Email or call Abby."
              cta={{ label: "abby@btymaterial.com", href: "mailto:abby@btymaterial.com" }}
            />
          ),
          d: (
            <Tile
              fill
              variant="cta"
              tone="surface"
              padding="sm"
              eyebrow="09 · Direct"
              title="508.579.9897"
              cta={{ label: "Call now", href: "tel:5085799897" }}
            />
          ),
        }}
      />
    </>
  );
}