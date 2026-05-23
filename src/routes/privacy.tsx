import { createFileRoute } from "@tanstack/react-router";
import { FileText, Mail, Phone, ShieldCheck } from "lucide-react";
import yardPiles from "@/assets/source/yard-piles.webp";
import { Tile } from "@/components/site/Tile";
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
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-home.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-home.jpg" },
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
        heading="Privacy policy and terms"
        headingLevel="h1"
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
                body: "Plain-English on the front. Tap a card for the full text.",
                align: "bottom-left",
                layout: "anchored",
                anchorIcon: <FileText />,
              }}
            />
          ),
          a: (
            <Tile
              id="priv-collect"
              fill
              variant="flip"
              ariaLabel="What we collect"
              front={{
                variant: "text",
                tone: "kraft",
                layout: "anchored",
                eyebrow: "01 · Data",
                title: "Name, phone, email, address.",
              }}
              back={{
                variant: "text",
                tone: "kraft",
                layout: "anchored",
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
              id="priv-cookies"
              fill
              variant="flip"
              ariaLabel="Cookies"
              front={{
                variant: "text",
                tone: "surface",
                layout: "anchored",
                eyebrow: "02 · Cookies",
                title: "Essential on. Others off.",
              }}
              back={{
                variant: "text",
                tone: "surface",
                layout: "anchored",
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
              id="priv-sharing"
              fill
              variant="flip"
              ariaLabel="How we share"
              front={{
                variant: "text",
                tone: "kraft",
                layout: "anchored",
                eyebrow: "03 · Sharing",
                title: "We don't sell your info.",
              }}
              back={{
                variant: "text",
                tone: "kraft",
                layout: "anchored",
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
              id="priv-choices"
              fill
              variant="flip"
              ariaLabel="Your choices"
              front={{
                variant: "text",
                tone: "kraft",
                layout: "anchored",
                eyebrow: "04 · Rights",
                title: "Access, correct, delete.",
              }}
              back={{
                variant: "text",
                tone: "kraft",
                layout: "anchored",
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

      {/* Screen 2 — section05: Terms + SMS + Mail + Entity + Email + Call */}
      <TileScreen
        layout="section05"
        label="SMS terms, website terms, and contact"
        heading="SMS terms, website terms, and contact"
        tiles={{
          hero: (
            <Tile
              id="priv-terms"
              fill
              size="feature"
              variant="flip"
              ariaLabel="Website terms of use"
              front={{
                variant: "text",
                tone: "surface",
                layout: "anchored",
                eyebrow: "05 · Terms",
                title: "Use the site lawfully.",
                body: "Prices are estimates — confirmed by phone. MA law governs.",
              }}
              back={{
                variant: "text",
                tone: "surface",
                layout: "anchored",
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
              id="priv-sms"
              fill
              variant="flip"
              ariaLabel="SMS terms"
              front={{
                variant: "text",
                tone: "kraft",
                layout: "anchored",
                eyebrow: "06 · SMS",
                title: "Reply STOP any time.",
              }}
              back={{
                variant: "text",
                tone: "kraft",
                layout: "anchored",
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
              id="priv-address"
              fill
              variant="text"
              tone="white"
              layout="anchored"
              anchorIndex="07"
              icon={<Mail />}
              eyebrow="07 · Mail"
              title="2264 Main St."
              body="Jefferson, MA 01522"
            />
          ),
          c: (
            <Tile
              id="priv-entity"
              fill
              variant="text"
              tone="kraft"
              layout="anchored"
              icon={<ShieldCheck />}
              eyebrow="Legal entity"
              title="Buy The Yard, LLC"
              body="MA woman-owned. Records kept 7 yrs."
            />
          ),
          d: (
            <Tile
              id="priv-email"
              fill
              variant="cta"
              tone="brand"
              anchorIndex="08"
              icon={<Mail />}
              eyebrow="08 · Email"
              title="Questions?"
              cta={{ label: "Email Abby", href: "mailto:abby@btymaterial.com" }}
            />
          ),
          e: (
            <Tile
              id="priv-call"
              fill
              variant="cta"
              tone="kraft"
              anchorIndex="09"
              icon={<Phone />}
              eyebrow="09 · Call"
              title="508.579.9897"
              cta={{ label: "Call now", href: "tel:5085799897" }}
            />
          ),
        }}
      />
    </>
  );
}