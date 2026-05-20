import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Check,
  Copy,
  Mail,
  MessageSquare,
  Minus,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { products, categories } from "@/data/products";
import mulchHemlock from "@/assets/mulch-hemlock.webp";
import stoneRiver from "@/assets/stone-river.webp";
import loam from "@/assets/loam.webp";
import {
  CONTACT_METHODS,
  DROP_SPOTS,
  TIMING,
  TOWNS,
  UNITS,
  buildBrief,
  buildMailto,
  buildSmsHref,
  defaultUnitFor,
  quoteSchema,
  type QuoteData,
} from "@/lib/quote-brief";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Build a quote in under a minute. Send it straight to Abby — by email or text. Pickup or delivery in Central MA.",
      },
      { property: "og:title", content: "Get a Quote — Buy The Yard" },
      {
        property: "og:description",
        content: "Tell us what you need. We come back with pricing and a delivery window.",
      },
      { property: "og:url", content: "/quote" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-quote.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-quote.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/quote" },
    ],
  }),
  component: QuotePage,
});

const inputCls =
  "w-full bg-white text-zinc-900 px-3 h-11 ring-1 ring-zinc-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-brand placeholder:text-zinc-400";
const labelCls =
  "eyebrow text-zinc-700 mb-2 block";
const errorCls = "text-xs text-red-700 mt-1";

const sortedProducts = [...products].sort((a, b) => {
  const ca = categories.indexOf(a.category);
  const cb = categories.indexOf(b.category);
  if (ca !== cb) return ca - cb;
  return a.name.localeCompare(b.name);
});

function QuotePage() {
  const [submitted, setSubmitted] = useState<QuoteData | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<QuoteData>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      items: [{ product: "", quantity: 1, unit: "cu yd" }],
      fulfillment: "Pickup",
      bestContact: "Call",
      name: "",
      phone: "",
      email: "",
      notes: "",
      acknowledged: false,
    },
  });

  const { register, control, handleSubmit, watch, setValue, formState } = form;
  const items = useFieldArray({ control, name: "items" });
  const fulfillment = watch("fulfillment");
  const timing = watch("timing");

  const onSubmit = (data: QuoteData) => {
    setSubmitted(data);
    setCopied(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (submitted) {
    return (
      <SuccessView
        data={submitted}
        onEdit={() => setSubmitted(null)}
        copied={copied}
        setCopied={setCopied}
      />
    );
  }

  return (
    <>
      <section className="bg-surface text-surface-foreground">
        {/* Mobile stacked hero */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-1">
            <div className="aspect-square overflow-hidden"><img src={mulchHemlock} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" /></div>
            <div className="aspect-square overflow-hidden"><img src={loam} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" /></div>
            <div className="aspect-square overflow-hidden"><img src={stoneRiver} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" /></div>
          </div>
          <div className="px-5 py-8">
            <p className="eyebrow text-brand mb-4">Get a quote</p>
            <h1 className="display-2 leading-[0.9]">
              Tell us. <span className="text-brand">We'll price it.</span>
            </h1>
            <p className="mt-4 text-zinc-300 text-base">
              About 60 seconds of clicking. One tap sends it to Abby — she'll come back with the number and a window.
            </p>
          </div>
        </div>

        {/* Desktop split hero */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 section-loose grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7">
              <p className="eyebrow text-brand mb-4">Get a quote</p>
              <h1 className="display-1 leading-[0.9] max-w-[14ch]">
                Tell us. <span className="text-brand">We'll price it.</span>
              </h1>
              <p className="mt-6 text-zinc-400 max-w-[52ch] text-lg">
                About 60 seconds of clicking. One tap sends it to Abby — she'll come back with the number and a window.
              </p>
            </div>
            <div className="col-span-5 grid grid-cols-2 gap-2">
              <div className="aspect-square overflow-hidden rounded-md ring-1 ring-white/10 col-span-2">
                <img src={mulchHemlock} alt="Hemlock mulch piles" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-md ring-1 ring-white/10"><img src={loam} alt="Screened loam" loading="lazy" decoding="async" className="w-full h-full object-cover" /></div>
              <div className="aspect-square overflow-hidden rounded-md ring-1 ring-white/10"><img src={stoneRiver} alt="River stone" loading="lazy" decoding="async" className="w-full h-full object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="bg-kraft border-y border-zinc-300">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-8 md:py-10">
          <ul className="grid grid-cols-2 md:grid-cols-3 md:divide-x md:divide-zinc-300 gap-y-6">
            {[
              ["~60s", "To build a list"],
              ["1 owner", "Abby answers"],
              ["Same day", "Reply, in season"],
            ].map(([v, k]) => (
              <li key={k} className="md:px-8 first:md:pl-0 last:md:pr-0">
                <p className="display-4 text-zinc-900 leading-none">{v}</p>
                <p className="eyebrow text-zinc-600 mt-2">{k}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-base">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto px-5 md:px-6 space-y-8 md:space-y-10"
          noValidate
        >
          {/* PRODUCTS */}
          <StepTile
            number="01"
            eyebrow="Step 01 · Materials"
            title="What do you need?"
            helper="One row per material. Ballpark the quantity — we'll dial it in on the phone."
          >
            <div className="space-y-4">
              {items.fields.map((field, idx) => {
                const productErr = formState.errors.items?.[idx]?.product;
                const qtyErr = formState.errors.items?.[idx]?.quantity;
                return (
                  <div
                    key={field.id}
                    className="bg-kraft p-4 md:p-5 rounded-md ring-1 ring-zinc-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
                      <div>
                        <label className={labelCls}>Product</label>
                        <Controller
                          control={control}
                          name={`items.${idx}.product`}
                          render={({ field: f }) => (
                            <select
                              {...f}
                              className={inputCls}
                              onChange={(e) => {
                                f.onChange(e);
                                setValue(
                                  `items.${idx}.unit`,
                                  defaultUnitFor(e.target.value),
                                  { shouldValidate: true },
                                );
                              }}
                            >
                              <option value="">Select a product…</option>
                              {categories.map((cat) => (
                                <optgroup key={cat} label={cat}>
                                  {sortedProducts
                                    .filter((p) => p.category === cat)
                                    .map((p) => (
                                      <option key={p.name} value={p.name}>
                                        {p.name}
                                      </option>
                                    ))}
                                </optgroup>
                              ))}
                            </select>
                          )}
                        />
                        {productErr && (
                          <p className={errorCls}>{productErr.message}</p>
                        )}
                      </div>

                      <div>
                        <label className={labelCls}>Qty</label>
                        <Controller
                          control={control}
                          name={`items.${idx}.quantity`}
                          render={({ field: f }) => (
                            <div className="flex items-center ring-1 ring-zinc-300 rounded-sm bg-white h-11">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                className="px-3 h-full text-zinc-600 hover:text-brand"
                                onClick={() =>
                                  f.onChange(Math.max(1, Number(f.value) - 1))
                                }
                              >
                                <Minus className="size-4" />
                              </button>
                              <input
                                type="number"
                                inputMode="numeric"
                                min={1}
                                max={999}
                                value={f.value}
                                onChange={(e) =>
                                  f.onChange(
                                    e.target.value === ""
                                      ? ""
                                      : Math.max(1, Number(e.target.value)),
                                  )
                                }
                                className="w-14 text-center bg-transparent text-zinc-900 text-sm font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                className="px-3 h-full text-zinc-600 hover:text-brand"
                                onClick={() =>
                                  f.onChange(Math.min(999, Number(f.value) + 1))
                                }
                              >
                                <Plus className="size-4" />
                              </button>
                            </div>
                          )}
                        />
                        {qtyErr && <p className={errorCls}>{qtyErr.message}</p>}
                      </div>

                      <div>
                        <label className={labelCls}>Unit</label>
                        <select
                          className={`${inputCls} pr-2`}
                          {...register(`items.${idx}.unit` as const)}
                        >
                          {UNITS.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        aria-label="Remove product"
                        disabled={items.fields.length === 1}
                        onClick={() => items.remove(idx)}
                        className="h-11 px-3 text-zinc-500 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                items.append({ product: "", quantity: 1, unit: "cu yd" })
              }
              className="mt-4 inline-flex items-center gap-2 label text-zinc-900 hover:text-brand"
            >
              <Plus className="size-4" /> Add another product
            </button>
          </StepTile>

          {/* FULFILLMENT */}
          <StepTile
            number="02"
            eyebrow="Step 02 · Fulfillment"
            title="Pickup or delivery?"
            helper="Pick one. We'll show delivery details if you need them."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(["Pickup", "Delivery"] as const).map((opt) => (
                <label
                  key={opt}
                  className={`cursor-pointer rounded-md p-5 ring-1 transition-colors ${
                    fulfillment === opt
                      ? "bg-surface text-surface-foreground ring-brand"
                      : "bg-kraft text-zinc-900 ring-zinc-300 hover:ring-zinc-500"
                  }`}
                >
                  <input
                    type="radio"
                    value={opt}
                    {...register("fulfillment")}
                    className="sr-only"
                  />
                  <p className="display-4 leading-none">
                    {opt}
                  </p>
                  <p
                    className={`text-sm mt-2 ${fulfillment === opt ? "text-zinc-300" : "text-zinc-600"}`}
                  >
                    {opt === "Pickup"
                      ? "I've got a truck or trailer and I'll come grab it."
                      : "Bring it to me — I'm in Central Mass."}
                  </p>
                </label>
              ))}
            </div>

            {fulfillment === "Delivery" && (
              <div className="mt-3 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-kraft p-5 md:p-6 rounded-md ring-1 ring-zinc-300">
                <div>
                  <label className={labelCls}>Town</label>
                  <select className={inputCls} {...register("town")}>
                    <option value="">Select town…</option>
                    {TOWNS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {formState.errors.town && (
                    <p className={errorCls}>
                      {formState.errors.town.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>ZIP</label>
                  <input
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="01522"
                    className={inputCls}
                    {...register("zip")}
                  />
                  {formState.errors.zip && (
                    <p className={errorCls}>
                      {formState.errors.zip.message as string}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelCls}>Where should we drop it?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {DROP_SPOTS.map((d) => (
                      <label
                        key={d}
                        className="flex items-center gap-3 bg-white px-3 h-11 ring-1 ring-zinc-300 rounded-sm text-sm cursor-pointer hover:ring-zinc-500 has-[:checked]:ring-brand has-[:checked]:ring-2"
                      >
                        <input
                          type="radio"
                          value={d}
                          {...register("dropSpot")}
                          className="accent-[var(--brand)]"
                        />
                        <span className="text-zinc-900">{d}</span>
                      </label>
                    ))}
                  </div>
                  {formState.errors.dropSpot && (
                    <p className={errorCls}>
                      {formState.errors.dropSpot.message as string}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelCls}>When?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIMING.map((t) => (
                      <label
                        key={t}
                        className="flex items-center justify-center text-center bg-white px-2 h-11 ring-1 ring-zinc-300 rounded-sm text-xs font-semibold cursor-pointer hover:ring-zinc-500 has-[:checked]:ring-brand has-[:checked]:ring-2 has-[:checked]:text-brand text-zinc-900 uppercase tracking-wide"
                      >
                        <input
                          type="radio"
                          value={t}
                          {...register("timing")}
                          className="sr-only"
                        />
                        {t === "As soon as possible" ? "ASAP" : t}
                      </label>
                    ))}
                  </div>
                  {formState.errors.timing && (
                    <p className={errorCls}>
                      {formState.errors.timing.message as string}
                    </p>
                  )}
                  {timing === "Specific date" && (
                    <input
                      type="date"
                      className={`${inputCls} mt-3`}
                      {...register("specificDate")}
                    />
                  )}
                  {formState.errors.specificDate && (
                    <p className={errorCls}>
                      {formState.errors.specificDate.message as string}
                    </p>
                  )}
                </div>

                <label className="md:col-span-2 flex items-start gap-3 text-sm text-zinc-800 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("acknowledged")}
                    className="mt-1 size-4 accent-[var(--brand)]"
                  />
                  <span>
                    I understand the <strong>1-yard minimum</strong> and
                    <strong> 48-hour scheduling window</strong>, and that
                    delivery is driveway-to-curbline only.
                  </span>
                </label>
                {formState.errors.acknowledged && (
                  <p className={`${errorCls} md:col-span-2`}>
                    {formState.errors.acknowledged.message as string}
                  </p>
                )}
              </div>
            )}
          </StepTile>

          {/* CONTACT */}
          <StepTile
            number="03"
            eyebrow="Step 03 · Contact"
            title="How do we reach you?"
            helper="So Abby can come back with the number."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Name</label>
                <input
                  className={inputCls}
                  autoComplete="name"
                  {...register("name")}
                />
                {formState.errors.name && (
                  <p className={errorCls}>{formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(508) 555-0142"
                  className={inputCls}
                  {...register("phone")}
                />
                {formState.errors.phone && (
                  <p className={errorCls}>{formState.errors.phone.message}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputCls}
                  {...register("email")}
                />
                {formState.errors.email && (
                  <p className={errorCls}>{formState.errors.email.message}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Best way to reach me</label>
                <div className="grid grid-cols-3 gap-2">
                  {CONTACT_METHODS.map((m) => (
                    <label
                      key={m}
                      className="flex items-center justify-center bg-kraft px-2 h-11 ring-1 ring-zinc-300 rounded-sm label cursor-pointer hover:ring-zinc-500 has-[:checked]:ring-brand has-[:checked]:ring-2 has-[:checked]:text-brand text-zinc-900"
                    >
                      <input
                        type="radio"
                        value={m}
                        {...register("bestContact")}
                        className="sr-only"
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </StepTile>

          {/* NOTES */}
          <StepTile
            number="04"
            eyebrow="Step 04 · Notes"
            title="Anything else?"
            helper={'Optional. Steep driveway, gate code, "leave it by the rhododendron" — anything Abby should know.'}
          >
            <NotesField register={register} watch={watch} />
            {formState.errors.notes && (
              <p className={errorCls}>{formState.errors.notes.message}</p>
            )}
          </StepTile>

          <div className="pt-4 border-t border-zinc-300/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-zinc-600 max-w-[40ch]">
              Next screen previews your request so you can send it in one tap. Submitting means you agree to our{" "}
              <Link to="/privacy" className="underline hover:text-zinc-900">
                Privacy &amp; Terms
              </Link>
              .
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90 disabled:opacity-50"
            >
              Send my request
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

function NotesField({
  register,
  watch,
}: {
  register: ReturnType<typeof useForm<QuoteData>>["register"];
  watch: ReturnType<typeof useForm<QuoteData>>["watch"];
}) {
  const value = watch("notes") ?? "";
  return (
    <div className="relative">
      <textarea
        rows={4}
        maxLength={500}
        placeholder="e.g. Please leave behind the gate if I'm not home — there's a tarp marking the spot."
        className={`${inputCls} h-auto py-3 resize-y min-h-[110px]`}
        {...register("notes")}
      />
      <p className="meta text-zinc-500 mt-1 text-right tabular-nums">
        {value.length}/500
      </p>
    </div>
  );
}

function StepTile({
  number,
  eyebrow,
  title,
  helper,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="bg-kraft ring-1 ring-zinc-300 rounded-md overflow-hidden">
      {/* Mobile header */}
      <div className="md:hidden p-5 border-b border-zinc-300/70">
        <p className="display-2 leading-none text-brand">{number}</p>
        <p className="eyebrow text-zinc-600 mt-3">{eyebrow}</p>
        <p className="display-4 mt-1 text-zinc-900">{title}</p>
        {helper && <p className="body-sm text-zinc-600 mt-2">{helper}</p>}
      </div>
      {/* Desktop header */}
      <div className="hidden md:grid grid-cols-12 border-b border-zinc-300/70">
        <div className="col-span-3 bg-surface text-surface-foreground flex items-center justify-center p-6">
          <p className="display-1 leading-none text-brand">{number}</p>
        </div>
        <div className="col-span-9 p-7">
          <p className="eyebrow text-zinc-600">{eyebrow}</p>
          <p className="display-4 mt-1 text-zinc-900">{title}</p>
          {helper && <p className="body-sm text-zinc-600 mt-2 max-w-[55ch]">{helper}</p>}
        </div>
      </div>
      <div className="p-5 md:p-7">{children}</div>
    </fieldset>
  );
}

function SuccessView({
  data,
  onEdit,
  copied,
  setCopied,
}: {
  data: QuoteData;
  onEdit: () => void;
  copied: boolean;
  setCopied: (v: boolean) => void;
}) {
  const brief = useMemo(() => buildBrief(data), [data]);
  const mailto = useMemo(() => buildMailto(data), [data]);
  const sms = useMemo(() => buildSmsHref(data), [data]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore — fallback is select-and-copy from the visible textarea
    }
  };

  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-7xl mx-auto px-5 md:px-6 section-loose">
          <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
            <Check className="size-3.5" /> Request ready
          </p>
          <h1 className="display-2 leading-[0.9] max-w-[18ch]">
            Send it to <span className="text-brand">Abby.</span>
          </h1>
          <p className="mt-3 md:mt-6 text-zinc-400 max-w-[60ch] text-lg">
            One tap opens mail or messages with the full request typed. Hit send — she'll be back the same day.
          </p>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-3xl mx-auto px-5 md:px-6 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={mailto}
              className="inline-flex items-center justify-center gap-2 bg-brand text-brand-foreground h-14 label hover:opacity-90 rounded-sm"
            >
              <Mail className="size-4" /> Email Abby
            </a>
            <a
              href={sms}
              className="inline-flex items-center justify-center gap-2 bg-surface text-surface-foreground h-14 label hover:opacity-90 rounded-sm"
            >
              <MessageSquare className="size-4" /> Text Abby
            </a>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center justify-center gap-2 bg-kraft text-zinc-900 ring-1 ring-zinc-300 h-14 label hover:ring-zinc-500 rounded-sm"
            >
              {copied ? (
                <>
                  <Check className="size-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy request
                </>
              )}
            </button>
          </div>

          <div className="bg-kraft rounded-md ring-1 ring-zinc-300 overflow-hidden">
            <div className="px-5 py-3 border-b border-zinc-300/70 flex items-center justify-between">
              <p className="eyebrow text-zinc-700">
                Preview
              </p>
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center gap-2 label text-zinc-700 hover:text-brand"
              >
                <Pencil className="size-3.5" /> Edit
              </button>
            </div>
            <pre className="px-5 py-5 text-xs md:text-sm text-zinc-900 whitespace-pre-wrap font-mono leading-relaxed">
              {brief}
            </pre>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-2 label text-zinc-700 hover:text-brand"
            >
              <ArrowLeft className="size-4" /> Edit my request
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/contact"
              className="label text-zinc-500 hover:text-brand"
            >
              Or just call 508.579.9897 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}