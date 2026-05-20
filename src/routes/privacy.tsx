import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import yardPiles from "@/assets/source/yard-piles.webp";

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
const pCls = "body-sm text-zinc-700 leading-relaxed";

type Tile = {
  term: string;
  body: React.ReactNode;
  span?: 1 | 2;
};

type Block = {
  id: string;
  number: string;
  title: string;
  intro?: React.ReactNode;
  tiles: Tile[];
};

const BLOCKS: Block[] = [
  {
    id: "privacy",
    number: "01",
    title: "Privacy Policy",
    intro: (
      <>
        Buy The Yard, LLC (&ldquo;Buy The Yard,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates this website and a bulk
        landscape supply yard in Jefferson, Massachusetts. This policy explains
        what information we collect when you contact us, request a quote, place
        an order, or browse the site, and how we use it.
      </>
    ),
    tiles: [
      {
        term: "Information you provide",
        body: (
          <>
            When you call, text, email, fill out a quote or contact form, or
            chat with us on the site, you may share your name, phone number,
            email address, delivery address, project details, and any photos or
            notes you choose to send. We use this information to respond to
            your request, prepare quotes, schedule pickup or delivery, and
            complete your order.
          </>
        ),
        span: 2,
      },
      {
        term: "Information collected automatically",
        body: (
          <>
            Like most websites, ours may automatically collect basic technical
            information &mdash; browser type, device type, pages visited, and
            referring site &mdash; to help us understand traffic and improve
            the site. This information is not used to identify you personally.
          </>
        ),
      },
      {
        term: "Cookies",
        body: (
          <>
            We use cookies and similar browser storage in three categories:
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                <strong className="font-semibold text-zinc-900">Essential</strong>{" "}
                — always on. Required for the site to work, including security
                and remembering your cookie preferences.
              </li>
              <li>
                <strong className="font-semibold text-zinc-900">Analytics</strong>{" "}
                — off by default. Helps us understand which pages are useful.
              </li>
              <li>
                <strong className="font-semibold text-zinc-900">Marketing</strong>{" "}
                — off by default. Reserved for measuring ads. We do not
                currently run any marketing cookies.
              </li>
            </ul>
            <p className="mt-3">
              You can accept all cookies or customize your choice from the
              banner on your first visit, and change preferences any time from
              the &ldquo;Cookie settings&rdquo; link in the footer.
            </p>
          </>
        ),
        span: 2,
      },
      {
        term: "How we share information",
        body: (
          <>
            We do{" "}
            <strong className="font-semibold text-zinc-900">not</strong> sell,
            rent, or trade your personal information. We share it only when
            needed to fulfill your order (for example, with a driver delivering
            material to you) or when required by law. SMS consent and phone
            numbers are not shared with third parties for marketing.
          </>
        ),
      },
      {
        term: "Data retention",
        body: (
          <>
            We keep order, quote, and contact records for as long as needed to
            serve you and to meet reasonable business, accounting, and tax
            obligations &mdash; generally up to seven years for transaction
            records.
          </>
        ),
      },
      {
        term: "Your choices",
        body: (
          <>
            Ask us to access, correct, or delete your personal information by
            emailing{" "}
            <a href="mailto:abby@btymaterial.com" className={linkCls}>
              abby@btymaterial.com
            </a>
            . Stop SMS messages any time by replying STOP (see SMS Terms
            below).
          </>
        ),
      },
      {
        term: "Children's privacy",
        body: (
          <>
            This site is intended for adults purchasing landscape materials and
            is not directed to children under 13. We do not knowingly collect
            personal information from children.
          </>
        ),
      },
      {
        term: "Security",
        body: (
          <>
            We use reasonable safeguards to protect the information you share
            with us. No method of transmission or storage is 100% secure, and
            we can&rsquo;t guarantee absolute security.
          </>
        ),
      },
      {
        term: "Changes to this policy",
        body: (
          <>
            If we update this policy, we will revise the &ldquo;Last
            updated&rdquo; date at the top of this page.
          </>
        ),
      },
    ],
  },
  {
    id: "sms",
    number: "02",
    title: "SMS Terms",
    intro: (
      <>
        By opting into SMS through a form on this site, by phone, or in
        person, you agree to receive text messages from Buy The Yard, LLC
        related to delivery scheduling, quotes, order updates, and responses
        to your inquiries.
      </>
    ),
    tiles: [
      { term: "Frequency", body: "Message frequency varies based on your order activity." },
      { term: "Rates", body: "Message and data rates may apply." },
      { term: "Opt out", body: <>Reply <strong className="text-zinc-900">STOP</strong> at any time to opt out.</> },
      {
        term: "Help",
        body: (
          <>
            Reply <strong className="text-zinc-900">HELP</strong> for
            assistance, or visit{" "}
            <a href="https://btymaterial.com" className={linkCls}>
              btymaterial.com
            </a>
            .
          </>
        ),
      },
      { term: "Carriers", body: "Carriers are not liable for delayed or undelivered messages." },
      { term: "Not required", body: "Consent to receive SMS is not a condition of purchase." },
      {
        term: "Not shared",
        body: (
          <>
            SMS consent is not shared with third parties for marketing. See the{" "}
            <a href="#privacy" className={linkCls}>Privacy Policy</a> above for
            how we handle your phone number.
          </>
        ),
        span: 2,
      },
    ],
  },
  {
    id: "terms",
    number: "03",
    title: "Website Terms of Use",
    intro: (
      <>
        By using this website you agree to these terms. If you don&rsquo;t
        agree, please don&rsquo;t use the site.
      </>
    ),
    tiles: [
      {
        term: "Use of the site",
        body: "You agree to use the site only for lawful purposes. You won't scrape, copy in bulk, attempt to interfere with the site's operation, or use it to harass anyone.",
      },
      {
        term: "Intellectual property",
        body: "The Buy The Yard name, logo, photos, and site content are owned by Buy The Yard, LLC or used with permission. You may share links to the site, but please don't reproduce our content without written permission.",
      },
      {
        term: "Quotes and pricing",
        body: "Prices shown on the site or generated by our online quote tool are estimates. Final pricing is confirmed by phone and is subject to current material availability, delivery distance, fuel surcharges, and the volume you actually order.",
        span: 2,
      },
      {
        term: "Product appearance",
        body: "Mulch, loam, stone, sand, and other natural materials vary in color, size, texture, and moisture content from load to load and across seasons. Product photos on the site are representative, not exact.",
      },
      {
        term: "Delivery",
        body: "You are responsible for designating a safe, accessible drop location with adequate overhead clearance and ground conditions. Driveways, lawns, and surfaces near the drop spot may show normal impact from a loaded truck.",
      },
      {
        term: "Third-party links",
        body: "The site may link to third-party services such as Facebook, Yelp, and Google. We're not responsible for their content, policies, or practices.",
      },
      {
        term: "Disclaimer of warranties",
        body: "The site and its content are provided \u201Cas is\u201D without warranties of any kind, express or implied, to the fullest extent permitted by law.",
      },
      {
        term: "Limitation of liability",
        body: "To the fullest extent permitted by Massachusetts law, Buy The Yard, LLC and its owners, employees, and contractors will not be liable for indirect, incidental, or consequential damages arising out of your use of the site or our materials.",
        span: 2,
      },
      {
        term: "Governing law",
        body: "These terms are governed by the laws of the Commonwealth of Massachusetts. Any dispute will be brought in the state or federal courts located in Worcester County, Massachusetts.",
      },
      {
        term: "Changes",
        body: "We may update these terms from time to time. Continued use of the site after changes are posted means you accept the updated terms.",
      },
    ],
  },
];

function PrivacyPage() {
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        {/* Mobile stacked */}
        <div className="md:hidden">
          <div className="aspect-[16/10] overflow-hidden">
            <img src={yardPiles} alt="" className="w-full h-full object-cover opacity-60" />
          </div>
          <div className="px-5 py-8">
            <p className="eyebrow text-brand mb-4">Legal</p>
            <h1 className="display-2 leading-[0.9]">
              Privacy &amp; <span className="text-brand">Terms.</span>
            </h1>
            <p className="mt-4 text-sm text-zinc-400">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        {/* Desktop narrow split */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 section-loose grid grid-cols-12 gap-8 items-end">
            <div className="col-span-8">
              <p className="eyebrow text-brand mb-4">Legal</p>
              <h1 className="display-1 leading-[0.9]">
                Privacy &amp; <span className="text-brand">Terms.</span>
              </h1>
              <p className="mt-5 text-sm text-zinc-400">
                Last updated: {LAST_UPDATED}
              </p>
            </div>
            <div className="col-span-4">
              <div className="aspect-[4/5] overflow-hidden rounded-md ring-1 ring-white/10">
                <img src={yardPiles} alt="" className="w-full h-full object-cover opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Mobile: anchor chips */}
          <nav aria-label="On this page" className="md:hidden -mx-5 px-5 overflow-x-auto">
            <ul className="flex gap-2 pb-2 min-w-max">
              {[
                ["#privacy", "Privacy"],
                ["#cookies", "Cookies"],
                ["#sms", "SMS"],
                ["#terms", "Terms"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="inline-flex items-center px-4 h-9 label bg-kraft ring-1 ring-zinc-300 rounded-full text-zinc-800 hover:text-brand">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop: sticky TOC sidebar */}
          <aside className="hidden md:block md:col-span-3">
            <nav aria-label="On this page" className="sticky top-24 border-l-2 border-brand pl-5">
              <p className="eyebrow text-zinc-500 mb-3">On this page</p>
              <ol className="space-y-2 text-sm text-zinc-700 list-decimal pl-5">
                <li><a href="#privacy" className={linkCls}>Privacy Policy</a></li>
                <li><a href="#cookies" className={linkCls}>Cookies</a></li>
                <li><a href="#sms" className={linkCls}>SMS Terms</a></li>
                <li><a href="#terms" className={linkCls}>Website Terms of Use</a></li>
                <li><a href="#contact" className={linkCls}>Contact</a></li>
              </ol>
            </nav>
          </aside>

          <div className="md:col-span-9 max-w-4xl space-y-14">
            {BLOCKS.map((b) => (
              <section key={b.id} id={b.id} className="scroll-mt-24">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="display-3 text-brand leading-none">{b.number}</span>
                  <h2 className="display-4 tracking-tight text-zinc-900 leading-tight">
                    {b.title}
                  </h2>
                </div>
                {b.intro && (
                  <p className={`mb-6 max-w-[60ch] ${pCls}`}>{b.intro}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {b.tiles.map((t) => (
                    <article
                      key={t.term}
                      className={`bg-kraft ring-1 ring-zinc-300 rounded-md p-5 md:p-6 ${
                        t.span === 2 ? "md:col-span-2" : ""
                      }`}
                    >
                      <p className="eyebrow text-brand mb-2">{t.term}</p>
                      <div className={pCls}>{t.body}</div>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            {/* ---------------- Contact ---------------- */}
            <section id="contact" className="scroll-mt-24">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="display-3 text-brand leading-none">04</span>
                <h2 className="display-4 tracking-tight text-zinc-900 leading-tight">
                  Contact
                </h2>
              </div>
              <p className={`mb-6 max-w-[60ch] ${pCls}`}>
                Questions about this policy, your information, or our terms?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <article className="bg-kraft ring-1 ring-zinc-300 rounded-md p-5 md:p-6">
                  <p className="eyebrow text-brand mb-2">Mailing address</p>
                  <p className="body-sm text-zinc-700 leading-relaxed">
                    Buy The Yard, LLC<br />
                    2264 Main St.<br />
                    Jefferson, MA 01522
                  </p>
                </article>
                <article className="bg-surface text-surface-foreground rounded-md p-5 md:p-6">
                  <p className="eyebrow text-brand mb-2">Direct</p>
                  <p className="body-sm text-zinc-300 leading-relaxed">
                    <a href="mailto:abby@btymaterial.com" className="text-white underline underline-offset-4 hover:text-brand">
                      abby@btymaterial.com
                    </a>
                    <br />
                    <a href="tel:5085799897" className="text-white underline underline-offset-4 hover:text-brand">
                      508.579.9897
                    </a>
                  </p>
                </article>
              </div>
            </section>
          </section>
          </div>
        </div>
      </section>
    </>
  );
}