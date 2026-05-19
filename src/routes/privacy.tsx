import { createFileRoute } from "@tanstack/react-router";

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

const linkCls = "text-stamp underline underline-offset-4 hover:text-ink";
const h3Cls = "display-5 text-ink mt-8";
const pCls = "body text-ink-soft leading-relaxed";

function PrivacyPage() {
  return (
    <>
      <section className="bg-newsprint paper-grain border-b-4 border-ink">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft">LEGAL DESK · § L</span>
            <span className="dateline text-ink-soft hidden sm:inline tabular">
              LAST UPDATED · {LAST_UPDATED.toUpperCase()}
            </span>
          </div>
          <h1 className="display-2 mt-5 md:mt-7 text-ink text-balance max-w-[16ch]">
            Privacy &amp; <span className="text-stamp">Terms.</span>
          </h1>
        </div>
      </section>

      <section className="section bg-newsprint">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <nav
            aria-label="On this page"
            className="border-2 border-ink bg-newsprint-2 px-5 py-4 mb-12"
          >
            <p className="eyebrow text-stamp mb-3">CONTENTS</p>
            <ol className="space-y-1.5 body-sm text-ink list-decimal pl-5 marker:text-ink-soft marker:font-mono">
              <li><a href="#privacy" className={linkCls}>Privacy Policy</a></li>
              <li><a href="#cookies" className={linkCls}>Cookies</a></li>
              <li><a href="#sms" className={linkCls}>SMS Terms</a></li>
              <li><a href="#terms" className={linkCls}>Website Terms of Use</a></li>
              <li><a href="#contact" className={linkCls}>Contact</a></li>
            </ol>
          </nav>

          <div className="space-y-14">
            {/* ---------------- Privacy ---------------- */}
            <section id="privacy" className="scroll-mt-24">
              <h2 className="display-3 text-ink rule-thick pb-3">
                <span className="text-stamp mr-3">§ 01</span> Privacy Policy
              </h2>
              <p className={`mt-5 ${pCls}`}>
                Buy The Yard, LLC (&ldquo;Buy The Yard,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates this website and
                a bulk landscape supply yard in Jefferson, Massachusetts. This
                policy explains what information we collect when you contact us,
                request a quote, place an order, or browse the site, and how we
                use it.
              </p>

              <h3 className={h3Cls}>Information you provide</h3>
              <p className={`mt-3 ${pCls}`}>
                When you call, text, email, fill out a quote or contact form, or
                chat with us on the site, you may share your name, phone number,
                email address, delivery address, project details, and any photos
                or notes you choose to send. We use this information to respond
                to your request, prepare quotes, schedule pickup or delivery,
                and complete your order.
              </p>

              <h3 className={h3Cls}>Information collected automatically</h3>
              <p className={`mt-3 ${pCls}`}>
                Like most websites, ours may automatically collect basic
                technical information &mdash; browser type, device type, pages
                visited, and referring site &mdash; to help us understand
                traffic and improve the site. This information is not used to
                identify you personally.
              </p>

              <h3 id="cookies" className={`${h3Cls} scroll-mt-24`}>Cookies</h3>
              <p className={`mt-3 ${pCls}`}>
                We use cookies and similar browser storage in three categories:
              </p>
              <ul className="mt-3 space-y-3 text-zinc-700 leading-relaxed list-disc pl-5">
                <li>
                  <strong className="font-semibold text-zinc-900">Essential</strong> —
                  always on. Required for the site to work, including security
                  and remembering your cookie preferences.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-900">Analytics</strong> —
                  off by default. Helps us understand which pages are useful and
                  where visitors get stuck so we can improve the site.
                </li>
                <li>
                  <strong className="font-semibold text-zinc-900">Marketing</strong> —
                  off by default. Reserved for measuring ads or personalizing
                  promotions. We do not currently run any marketing cookies.
                </li>
              </ul>
              <p className={`mt-3 ${pCls}`}>
                You can accept all cookies or customize your choice from the
                banner on your first visit, and you can change your preferences
                any time from the &ldquo;Cookie settings&rdquo; link in the
                footer. You can also disable cookies in your browser settings;
                some parts of the site may not work as expected if you do.
              </p>

              <h3 className={h3Cls}>How we share information</h3>
              <p className={`mt-3 ${pCls}`}>
                We do <strong className="font-semibold text-zinc-900">not</strong>{" "}
                sell, rent, or trade your personal information. We share it only
                when needed to fulfill your order (for example, with a driver or
                contractor delivering material to you) or when required by law.
                SMS consent and phone numbers collected through this site are
                not shared with third parties or affiliates for marketing
                purposes.
              </p>

              <h3 className={h3Cls}>Data retention</h3>
              <p className={`mt-3 ${pCls}`}>
                We keep order, quote, and contact records for as long as needed
                to serve you and to meet reasonable business, accounting, and
                tax obligations &mdash; generally up to seven years for
                transaction records.
              </p>

              <h3 className={h3Cls}>Your choices</h3>
              <p className={`mt-3 ${pCls}`}>
                You can ask us to access, correct, or delete the personal
                information we hold about you by emailing{" "}
                <a href="mailto:abby@btymaterial.com" className={linkCls}>
                  abby@btymaterial.com
                </a>
                . You can stop SMS messages at any time by replying STOP (see
                SMS Terms below).
              </p>

              <h3 className={h3Cls}>Children&rsquo;s privacy</h3>
              <p className={`mt-3 ${pCls}`}>
                This site is intended for adults purchasing landscape materials
                and is not directed to children under 13. We do not knowingly
                collect personal information from children.
              </p>

              <h3 className={h3Cls}>Security</h3>
              <p className={`mt-3 ${pCls}`}>
                We use reasonable safeguards to protect the information you
                share with us. No method of transmission or storage is 100%
                secure, and we can&rsquo;t guarantee absolute security.
              </p>

              <h3 className={h3Cls}>Changes to this policy</h3>
              <p className={`mt-3 ${pCls}`}>
                If we update this policy, we will revise the &ldquo;Last
                updated&rdquo; date at the top of this page.
              </p>
            </section>

            {/* ---------------- SMS ---------------- */}
            <section id="sms" className="scroll-mt-24">
              <h2 className="display-3 text-ink rule-thick pb-3">
                <span className="text-stamp mr-3">§ 02</span> SMS Terms
              </h2>
              <p className={`mt-5 ${pCls}`}>
                By opting into SMS through a form on this site, by phone, or in
                person, you agree to receive text messages from Buy The Yard,
                LLC related to delivery scheduling, quotes, order updates, and
                responses to your inquiries.
              </p>
              <ul className="mt-5 space-y-3 text-zinc-700 leading-relaxed list-disc pl-5">
                <li>Message frequency varies based on your order activity.</li>
                <li>Message and data rates may apply.</li>
                <li>Reply <strong>STOP</strong> at any time to opt out.</li>
                <li>
                  Reply <strong>HELP</strong> for assistance, or visit{" "}
                  <a href="https://btymaterial.com" className={linkCls}>
                    btymaterial.com
                  </a>
                  .
                </li>
                <li>
                  Carriers are not liable for delayed or undelivered messages.
                </li>
                <li>Consent to receive SMS is not a condition of purchase.</li>
                <li>
                  SMS consent is not shared with third parties or affiliates for
                  marketing purposes. See the{" "}
                  <a href="#privacy" className={linkCls}>Privacy Policy</a>{" "}
                  above for how we handle your phone number.
                </li>
              </ul>
            </section>

            {/* ---------------- Terms of Use ---------------- */}
            <section id="terms" className="scroll-mt-24">
              <h2 className="display-3 text-ink rule-thick pb-3">
                <span className="text-stamp mr-3">§ 03</span> Website Terms of Use
              </h2>
              <p className={`mt-5 ${pCls}`}>
                By using this website you agree to these terms. If you
                don&rsquo;t agree, please don&rsquo;t use the site.
              </p>

              <h3 className={h3Cls}>Use of the site</h3>
              <p className={`mt-3 ${pCls}`}>
                You agree to use the site only for lawful purposes. You
                won&rsquo;t scrape, copy in bulk, attempt to interfere with the
                site&rsquo;s operation, or use it to harass anyone.
              </p>

              <h3 className={h3Cls}>Intellectual property</h3>
              <p className={`mt-3 ${pCls}`}>
                The Buy The Yard name, logo, photos, and site content are owned
                by Buy The Yard, LLC or used with permission. You may share
                links to the site, but please don&rsquo;t reproduce our content
                without written permission.
              </p>

              <h3 className={h3Cls}>Quotes and pricing</h3>
              <p className={`mt-3 ${pCls}`}>
                Prices shown on the site or generated by our online quote tool
                are estimates. Final pricing is confirmed by phone and is
                subject to current material availability, delivery distance,
                fuel surcharges, and the volume you actually order. Quotes are
                valid for a reasonable period and may be updated as market
                prices change.
              </p>

              <h3 className={h3Cls}>Product appearance</h3>
              <p className={`mt-3 ${pCls}`}>
                Mulch, loam, stone, sand, and other natural materials vary in
                color, size, texture, and moisture content from load to load
                and across seasons. Product photos on the site are
                representative, not exact.
              </p>

              <h3 className={h3Cls}>Delivery</h3>
              <p className={`mt-3 ${pCls}`}>
                You are responsible for designating a safe, accessible drop
                location with adequate overhead clearance and ground
                conditions. Driveways, lawns, and surfaces near the drop spot
                may show normal impact from a loaded truck; Buy The Yard is not
                responsible for damage caused by conditions outside our
                reasonable control once a drop location has been approved by
                you or someone at the address.
              </p>

              <h3 className={h3Cls}>Third-party links</h3>
              <p className={`mt-3 ${pCls}`}>
                The site may link to third-party services such as Facebook,
                Yelp, and Google. We&rsquo;re not responsible for their
                content, policies, or practices.
              </p>

              <h3 className={h3Cls}>Disclaimer of warranties</h3>
              <p className={`mt-3 ${pCls}`}>
                The site and its content are provided &ldquo;as is&rdquo;
                without warranties of any kind, express or implied, to the
                fullest extent permitted by law.
              </p>

              <h3 className={h3Cls}>Limitation of liability</h3>
              <p className={`mt-3 ${pCls}`}>
                To the fullest extent permitted by Massachusetts law, Buy The
                Yard, LLC and its owners, employees, and contractors will not
                be liable for indirect, incidental, or consequential damages
                arising out of your use of the site or our materials.
              </p>

              <h3 className={h3Cls}>Governing law</h3>
              <p className={`mt-3 ${pCls}`}>
                These terms are governed by the laws of the Commonwealth of
                Massachusetts. Any dispute will be brought in the state or
                federal courts located in Worcester County, Massachusetts.
              </p>

              <h3 className={h3Cls}>Changes</h3>
              <p className={`mt-3 ${pCls}`}>
                We may update these terms from time to time. Continued use of
                the site after changes are posted means you accept the updated
                terms.
              </p>
            </section>

            {/* ---------------- Contact ---------------- */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="display-3 text-ink rule-thick pb-3">
                <span className="text-stamp mr-3">§ 04</span> Contact
              </h2>
              <p className={`mt-5 ${pCls}`}>
                Questions about this policy, your information, or our terms?
              </p>
              <address className="mt-4 not-italic body text-ink leading-relaxed border-l-4 border-ink pl-5">
                <strong>Buy The Yard, LLC</strong><br />
                2264 Main St.<br />
                Jefferson, MA 01522<br />
                <a href="mailto:abby@btymaterial.com" className={linkCls}>
                  abby@btymaterial.com
                </a>
                <br />
                <a href="tel:5085799897" className={linkCls}>
                  508.579.9897
                </a>
              </address>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}