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
  "w-full bg-newsprint text-ink px-3 h-11 border-2 border-ink/30 rounded-none font-sans text-sm focus:outline-none focus:border-stamp placeholder:text-ink-soft/60";
const labelCls =
  "eyebrow text-ink mb-2 block";
const errorCls = "meta text-stamp mt-1 normal-case";

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
      <section className="bg-newsprint paper-grain border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft">ORDER FORM · § Q</span>
            <span className="dateline text-ink-soft hidden sm:inline">FILE WITH ABBY · ~60 SECONDS</span>
          </div>
          <h1 className="display-1 mt-5 md:mt-7 text-ink text-balance max-w-[18ch]">
            Tell us. <span className="text-stamp">We'll price it.</span>
          </h1>
          <p className="lead mt-4 max-w-[60ch] text-ink-soft not-italic">
            About 60 seconds of clicking. One tap sends it to Abby — she'll come back with the number and a window.
          </p>
        </div>
      </section>

      <section className="section bg-newsprint-2 border-b border-rule-strong">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto px-5 md:px-8 space-y-12"
          noValidate
        >
          {/* PRODUCTS */}
          <fieldset>
            <legend className="display-3 text-ink mb-2 pb-3 rule-thick w-full">
              <span className="text-stamp mr-2">§ 01</span> What do you need?
            </legend>
            <p className="body-sm text-ink-soft mb-5 mt-3">
              One row per material. Ballpark the quantity — we'll dial it in on the phone.
            </p>

            <div className="space-y-4">
              {items.fields.map((field, idx) => {
                const productErr = formState.errors.items?.[idx]?.product;
                const qtyErr = formState.errors.items?.[idx]?.quantity;
                return (
                  <div
                    key={field.id}
                    className="bg-newsprint p-4 md:p-5 border-2 border-ink/80 relative"
                  >
                    <span className="absolute -top-3 left-3 bg-newsprint px-2 dateline text-ink-soft">
                      № {String(idx + 1).padStart(2, "0")}
                    </span>
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
                            <div className="flex items-center border-2 border-ink/30 bg-newsprint h-11">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                className="px-3 h-full text-ink-soft hover:text-stamp"
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
                                className="w-14 text-center bg-transparent text-ink font-mono text-sm font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                className="px-3 h-full text-ink-soft hover:text-stamp"
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
                        className="h-11 px-3 text-ink-soft hover:text-stamp disabled:opacity-30 disabled:cursor-not-allowed"
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
              className="mt-5 inline-flex items-center gap-2 label text-ink hover:text-stamp border-2 border-ink/40 px-4 h-11 hover:border-stamp"
            >
              <Plus className="size-4" /> Add another row
            </button>
          </fieldset>

          {/* FULFILLMENT */}
          <fieldset>
            <legend className="display-3 text-ink mb-2 pb-3 rule-thick w-full">
              <span className="text-stamp mr-2">§ 02</span> Pickup or delivery?
            </legend>
            <p className="body-sm text-ink-soft mb-5 mt-3">
              Pickup if you've got a truck. Delivery if you don't.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(["Pickup", "Delivery"] as const).map((opt) => (
                <label
                  key={opt}
                  className={`cursor-pointer p-5 border-2 transition-colors ${
                    fulfillment === opt
                      ? "bg-ink text-newsprint border-ink"
                      : "bg-newsprint text-ink border-ink/30 hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    value={opt}
                    {...register("fulfillment")}
                    className="sr-only"
                  />
                  <p className="display-4 leading-none uppercase">
                    {opt}
                  </p>
                  <p
                    className={`body-sm mt-2 ${fulfillment === opt ? "text-newsprint/70" : "text-ink-soft"}`}
                  >
                    {opt === "Pickup"
                      ? "I've got a truck or trailer and I'll come grab it."
                      : "Bring it to me — I'm in Central Mass."}
                  </p>
                </label>
              ))}
            </div>

            {fulfillment === "Delivery" && (
              <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-newsprint-2 p-5 md:p-6 border-2 border-ink/80">
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
                        className="flex items-center gap-3 bg-newsprint px-3 h-11 border-2 border-ink/30 text-sm cursor-pointer hover:border-ink has-[:checked]:border-stamp has-[:checked]:bg-stamp/5"
                      >
                        <input
                          type="radio"
                          value={d}
                          {...register("dropSpot")}
                          className="accent-[var(--stamp)]"
                        />
                        <span className="text-ink">{d}</span>
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
                        className="flex items-center justify-center text-center bg-newsprint px-2 h-11 border-2 border-ink/30 font-mono text-xs font-semibold cursor-pointer hover:border-ink has-[:checked]:border-stamp has-[:checked]:bg-stamp has-[:checked]:text-newsprint text-ink uppercase tracking-wide"
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

                <label className="md:col-span-2 flex items-start gap-3 body-sm text-ink cursor-pointer border-t-2 border-ink/20 pt-4">
                  <input
                    type="checkbox"
                    {...register("acknowledged")}
                    className="mt-1 size-4 accent-[var(--stamp)]"
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
          </fieldset>

          {/* CONTACT */}
          <fieldset>
            <legend className="display-3 text-ink mb-2 pb-3 rule-thick w-full">
              <span className="text-stamp mr-2">§ 03</span> How do we reach you?
            </legend>
            <p className="body-sm text-ink-soft mb-5 mt-3">
              We use this once — to get back to you with the number.
            </p>

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
                      className="flex items-center justify-center bg-newsprint px-2 h-11 border-2 border-ink/30 label cursor-pointer hover:border-ink has-[:checked]:border-stamp has-[:checked]:bg-stamp has-[:checked]:text-newsprint text-ink"
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
          </fieldset>

          {/* NOTES */}
          <fieldset>
            <legend className="display-3 text-ink mb-2 pb-3 rule-thick w-full">
              <span className="text-stamp mr-2">§ 04</span> Anything else?
            </legend>
            <p className="body-sm text-ink-soft mb-3 mt-3">
              Optional. Steep driveway, gate code, "leave it by the rhododendron" — anything Abby should know.
            </p>
            <NotesField register={register} watch={watch} />
            {formState.errors.notes && (
              <p className={errorCls}>{formState.errors.notes.message}</p>
            )}
          </fieldset>

          <div className="pt-6 border-t-4 border-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="meta text-ink-soft max-w-[40ch] normal-case">
              Next screen previews your request so you can send it in one tap. Submitting means you agree to our{" "}
              <Link to="/privacy" className="underline hover:text-ink">
                Privacy &amp; Terms
              </Link>
              .
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-ink text-newsprint px-7 h-12 label hover:bg-stamp btn-press disabled:opacity-50"
            >
              File this request →
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
      <p className="meta text-ink-soft mt-1 text-right tabular-nums">
        {value.length}/500
      </p>
    </div>
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
      <section className="bg-newsprint paper-grain border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft inline-flex items-center gap-2">
              <Check className="size-3.5 text-stamp" /> REQUEST READY · § Q-OUT
            </span>
            <span className="dateline text-ink-soft hidden sm:inline">ONE TAP TO SEND</span>
          </div>
          <h1 className="display-1 mt-5 md:mt-7 text-ink text-balance max-w-[18ch]">
            Send it to <span className="text-stamp">Abby.</span>
          </h1>
          <p className="lead mt-4 max-w-[60ch] text-ink-soft not-italic">
            One tap opens mail or messages with the full request typed. Hit send — she'll be back the same day.
          </p>
        </div>
      </section>

      <section className="section bg-newsprint-2 border-b border-rule-strong">
        <div className="max-w-3xl mx-auto px-5 md:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={mailto}
              className="inline-flex items-center justify-center gap-2 bg-ink text-newsprint h-14 label hover:bg-stamp btn-press border-2 border-ink"
            >
              <Mail className="size-4" /> Email Abby
            </a>
            <a
              href={sms}
              className="inline-flex items-center justify-center gap-2 bg-stamp text-newsprint h-14 label hover:bg-ink btn-press border-2 border-stamp hover:border-ink"
            >
              <MessageSquare className="size-4" /> Text Abby
            </a>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center justify-center gap-2 bg-newsprint text-ink border-2 border-ink/40 h-14 label hover:border-ink btn-press"
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

          <div className="bg-newsprint border-2 border-ink overflow-hidden">
            <div className="px-5 py-3 border-b-2 border-ink flex items-center justify-between bg-newsprint-2">
              <p className="dateline text-ink-soft">
                CARBON COPY · PREVIEW
              </p>
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center gap-2 label text-ink hover:text-stamp"
              >
                <Pencil className="size-3.5" /> Edit
              </button>
            </div>
            <pre className="px-5 py-5 text-xs md:text-sm text-ink whitespace-pre-wrap font-mono leading-relaxed">
              {brief}
            </pre>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-2 label text-ink-soft hover:text-stamp"
            >
              <ArrowLeft className="size-4" /> Edit my request
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/contact"
              className="label text-ink-soft hover:text-stamp"
            >
              Or just call 508.579.9897 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}