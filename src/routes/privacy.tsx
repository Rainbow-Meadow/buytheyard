import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy & Terms — Buy The Yard Materials" },
      {
        name: "description",
        content:
          "How Buy The Yard Materials uses your contact information, plus SMS terms and conditions for delivery scheduling and quotes.",
      },
      { property: "og:title", content: "Privacy Policy & Terms — Buy The Yard Materials" },
      {
        property: "og:description",
        content: "Privacy practices and SMS terms for Buy The Yard Materials in Jefferson, MA.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/privacy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-4xl mx-auto px-5 md:px-6 section-loose">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4">
            Legal
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.9]">
            Privacy & <span className="text-brand">Terms.</span>
          </h1>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-3xl mx-auto px-5 md:px-6 space-y-14">
          <div>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-zinc-900">
              Privacy Policy
            </h2>
            <div className="mt-5 space-y-4 text-zinc-700 leading-relaxed">
              <p>
                Personal information such as phone number and address provided
                in the &ldquo;Let&rsquo;s Chat&rdquo; or quote request sections
                is used for business communication purposes only &mdash; quotes,
                answers to questions, and material delivery.
              </p>
              <p>
                Due to the nature of our services, address and phone number
                are necessary information to provide delivery service. We will
                not share your information for any reason, and it can only be
                accessed by Buy The Yard personnel.
              </p>
              <p className="font-semibold text-zinc-900">
                SMS consent is not shared with third parties or affiliates for
                marketing purposes.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-zinc-900">
              Terms &amp; Conditions (SMS)
            </h2>
            <ul className="mt-5 space-y-3 text-zinc-700 leading-relaxed list-disc pl-5">
              <li>Messaging frequency may vary.</li>
              <li>Message and data rates may apply.</li>
              <li>To opt out at any time, text STOP.</li>
              <li>
                For assistance, text HELP or visit{" "}
                <a
                  href="https://btymaterial.com"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  btymaterial.com
                </a>
                .
              </li>
              <li>
                By opting into SMS from a web form or other medium, you are
                agreeing to receive SMS messages from Buy The Yard, LLC. This
                includes messages for delivery scheduling, messages pertaining
                to existing orders, and responses to inquiries.
              </li>
            </ul>
            <p className="mt-3 md:mt-6 text-sm text-zinc-600">
              Questions? Email{" "}
              <a
                href="mailto:abby@btymaterial.com"
                className="text-brand hover:opacity-80"
              >
                abby@btymaterial.com
              </a>{" "}
              or call{" "}
              <a href="tel:5085799897" className="text-brand hover:opacity-80">
                508.579.9897
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}