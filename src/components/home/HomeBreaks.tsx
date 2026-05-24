import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const decisionPaths = [
  {
    eyebrow: "Material",
    title: "Find the right material",
    body: "Start with the project if you are not sure what to order.",
    to: "/products",
  },
  {
    eyebrow: "Quantity",
    title: "Estimate the yards",
    body: "Measure what you can. Abby will confirm before it leaves the yard.",
    to: "/quote",
  },
  {
    eyebrow: "Delivery",
    title: "Check the drop rules",
    body: "1-yard minimum, driveway or curbline, marked spot preferred.",
    to: "/delivery",
  },
  {
    eyebrow: "Contractors",
    title: "Send a jobsite list",
    body: "Product, quantity, town, timing, and notes in one quick request.",
    to: "/quote",
  },
] as const;

const deliveryBasics = [
  { label: "Service area", value: "Central Mass, from the Jefferson yard" },
  { label: "Minimum", value: "1 yard per delivery" },
  { label: "Timing", value: "48 hours is best; same-day only when the route allows" },
  { label: "Drop spot", value: "Driveway or curbline only — mark it clearly" },
  { label: "Payment", value: "Cash or check; cards add 4%" },
] as const;

const proofRows = [
  { label: "Certified", value: "MA WBE-certified woman-owned business" },
  { label: "Licensed", value: "MA HIC #214009 · USDOT #3543587" },
  { label: "Local", value: "CTMS loam donation · Rutland Memorial Day support" },
] as const;

function LedgerRow({
  label,
  value,
  index,
  tone = "kraft",
}: {
  label: string;
  value: string;
  index: number;
  tone?: "kraft" | "ink";
}) {
  const isInk = tone === "ink";
  return (
    <div
      className={`grid gap-2 px-5 py-4 md:grid-cols-[180px_1fr] md:gap-6 border-b last:border-b-0 ${
        isInk ? "border-white/10" : "border-zinc-100"
      }`}
    >
      <p className="eyebrow text-brand inline-flex items-center gap-2">
        <span aria-hidden="true" className={isInk ? "text-white/40" : "text-zinc-400"}>
          {String(index + 1).padStart(2, "0")}
        </span>
        {label}
      </p>
      <p className={`body text-pretty ${isInk ? "text-zinc-200" : "text-zinc-800"}`}>{value}</p>
    </div>
  );
}

export function DecisionPathBreak() {
  return (
    <section aria-labelledby="decision-path-heading" className="section bg-base text-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand mb-3">Start here</p>
            <h2 id="decision-path-heading" className="display-3 max-w-[14ch] text-balance">
              What are you trying to figure out?
            </h2>
            <p className="body text-zinc-700 max-w-[50ch] mt-4 text-pretty">
              Most orders start with a question: which material, how many yards, whether we
              deliver, or how to get it to the jobsite without surprises.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {decisionPaths.map((path, index) => (
              <Link
                key={path.title}
                to={path.to}
                className="group relative rounded-lg bg-white ring-1 ring-zinc-200 p-5 hover:bg-zinc-50 transition-colors"
              >
                <span aria-hidden="true" className="absolute left-0 inset-y-0 w-[1.5px] bg-brand" />
                <p className="eyebrow text-brand mb-2 inline-flex items-center gap-2">
                  <span aria-hidden="true" className="text-zinc-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {path.eyebrow}
                </p>
                <p className="display-5 leading-tight text-balance">{path.title}</p>
                <p className="body-sm text-zinc-700 mt-2 text-pretty">{path.body}</p>
                <p className="label text-brand mt-4 inline-flex items-center gap-2">
                  Start <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeliveryBasicsBreak() {
  return (
    <section aria-labelledby="delivery-basics-heading" className="section bg-surface text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.6fr] lg:items-stretch">
          <div className="relative rounded-lg bg-zinc-950 ring-1 ring-white/10 p-6 md:p-8">
            <span aria-hidden="true" className="absolute left-0 inset-y-0 w-[1.5px] bg-brand" />
            <p className="eyebrow text-brand mb-3">Delivery & proof</p>
            <h2 id="delivery-basics-heading" className="display-3 max-w-[14ch] text-balance">
              Know before the truck rolls
            </h2>
            <p className="body text-zinc-300 max-w-[46ch] mt-4 text-pretty">
              We confirm the town, quantity, timing, and drop spot so the delivery is simple
              when the truck pulls in.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                to="/delivery"
                className="inline-flex items-center gap-2 label text-white hover:text-brand transition-colors"
              >
                Delivery details <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/service-area"
                className="inline-flex items-center gap-2 label text-white/70 hover:text-white transition-colors"
              >
                Service area
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-kraft text-zinc-900 ring-1 ring-zinc-200 overflow-hidden">
            {deliveryBasics.map((item, index) => (
              <LedgerRow key={item.label} index={index} label={item.label} value={item.value} />
            ))}
            {proofRows.map((row, index) => (
              <LedgerRow
                key={row.label}
                index={deliveryBasics.length + index}
                label={row.label}
                value={row.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Kept exported for backward compat with other routes; no longer used on /.
export function LocalProofPanel() {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-lg bg-kraft text-zinc-900 ring-1 ring-zinc-200 p-5 md:p-6">
      <span aria-hidden="true" className="absolute left-0 inset-y-0 w-[1.5px] bg-brand" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-5">
        <div>
          <p className="eyebrow text-brand mb-3">Local proof</p>
          <h2 className="display-4 max-w-[16ch] text-balance">Local proof with receipts</h2>
          <p className="body-sm text-zinc-700 mt-3 max-w-[54ch] text-pretty">
            Certified, licensed, locally rooted — with real donations and town support to show for it.
          </p>
        </div>
        <div className="grid gap-2.5 md:grid-cols-3 auto-rows-fr">
          {proofRows.map((row) => (
            <div
              key={row.label}
              className="relative rounded-md bg-white ring-1 ring-zinc-200 p-3 md:p-4 flex flex-col gap-2"
            >
              <span aria-hidden="true" className="absolute left-0 inset-y-2 w-[1.5px] bg-brand" />
              <p className="eyebrow text-brand">{row.label}</p>
              <p className="body-sm text-zinc-800 text-pretty leading-snug">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function AbbyTrustBreak() {
  return (
    <section aria-labelledby="abby-heading" className="section bg-base text-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand mb-3">About Abby</p>
            <h2 id="abby-heading" className="display-3 max-w-[16ch] text-balance text-zinc-950">
              Abby grew up around the work. Then she built the yard.
            </h2>
          </div>
          <div className="space-y-5 max-w-[64ch]">
            <p className="body text-zinc-700 text-pretty">
              Abby Montalto grew up around trucks, equipment, and material work, then built Buy
              The Yard while studying Entrepreneurship &amp; Small Business at Worcester State.
            </p>
            <p className="body text-zinc-700 text-pretty">
              She still runs it the way locals appreciate: direct answers, practical help, and
              someone who actually picks up the phone — anchored in the same Jefferson grit
              that started it all in 2016.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 label text-brand hover:opacity-80"
            >
              Read Abby&rsquo;s story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
