import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useForm, useFieldArray, Controller, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  Clock,
  Copy,
  Layers,
  Mail,
  MessageSquare,
  Minus,
  Pencil,
  Phone,
  Plus,
  Send,
  Trash2,
  User,
} from "lucide-react";
import { products, categories } from "@/data/products";
import mulchHemlock from "@/assets/mulch-hemlock.webp";
import stoneRiver from "@/assets/stone-river.webp";
import loam from "@/assets/loam.webp";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";
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
const labelCls = "eyebrow text-zinc-700 mb-2 block";
const errorCls = "text-xs text-red-700 mt-1";

const sortedProducts = [...products].sort((a, b) => {
  const ca = categories.indexOf(a.category);
  const cb = categories.indexOf(b.category);
  if (ca !== cb) return ca - cb;
  return a.name.localeCompare(b.name);
});

const STEP_LABELS = ["Materials", "Fulfillment", "Contact", "Review"] as const;

function QuotePage() {
  const [submitted, setSubmitted] = useState<QuoteData | null>(null);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(0);

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

  const { register, control, handleSubmit, watch, setValue, formState, trigger, getValues } = form;
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

  const validateStep = async (s: number): Promise<boolean> => {
    const fields: FieldPath<QuoteData>[] = [];
    if (s === 0) {
      getValues("items").forEach((_, i) => {
        fields.push(`items.${i}.product` as FieldPath<QuoteData>);
        fields.push(`items.${i}.quantity` as FieldPath<QuoteData>);
        fields.push(`items.${i}.unit` as FieldPath<QuoteData>);
      });
    } else if (s === 1) {
      fields.push("fulfillment");
      if (fulfillment === "Delivery") {
        fields.push("town", "zip", "dropSpot", "timing", "acknowledged");
        if (timing === "Specific date") fields.push("specificDate");
      }
    } else if (s === 2) {
      fields.push("name", "phone", "email", "bestContact");
    }
    if (fields.length === 0) return true;
    return trigger(fields);
  };

  const goNext = async () => {
    const ok = await validateStep(step);
    if (ok) setStep((s) => Math.min(STEP_LABELS.length - 1, s + 1));
  };
  const goPrev = () => setStep((s) => Math.max(0, s - 1));

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
    <TileScreen
      layout="pageHero"
      label="Build a quote"
      tiles={{
        hero: (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="h-full w-full bg-kraft text-zinc-900 ring-1 ring-zinc-300 rounded-md overflow-hidden flex flex-col"
          >
            {/* Header — step pips */}
            <div className="px-5 md:px-7 pt-5 md:pt-6 pb-4 border-b border-zinc-300/70">
              <div className="flex items-center justify-between gap-4 mb-4">
                <p className="eyebrow text-brand">
                  Step {String(step + 1).padStart(2, "0")} · {STEP_LABELS[step]}
                </p>
                <p className="meta text-zinc-500 tabular-nums">
                  {step + 1} / {STEP_LABELS.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {STEP_LABELS.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={async () => {
                      if (i <= step) {
                        setStep(i);
                      } else {
                        // Validate intermediate steps before jumping forward.
                        for (let s = step; s < i; s++) {
                          // eslint-disable-next-line no-await-in-loop
                          const ok = await validateStep(s);
                          if (!ok) {
                            setStep(s);
                            return;
                          }
                        }
                        setStep(i);
                      }
                    }}
                    aria-label={`Go to step ${i + 1}: ${label}`}
                    aria-current={i === step}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i === step
                        ? "bg-brand"
                        : i < step
                          ? "bg-zinc-700"
                          : "bg-zinc-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slide content — scrollable inside the tile */}
            <div className="flex-1 overflow-y-auto px-5 md:px-7 py-5 md:py-6">
              {step === 0 && (
                <SlideHeader
                  title="What do you need?"
                  helper="One row per material. Ballpark the quantity — we dial it in on the phone."
                >
                  <div className="space-y-3">
                    {items.fields.map((field, idx) => {
                      const productErr = formState.errors.items?.[idx]?.product;
                      const qtyErr = formState.errors.items?.[idx]?.quantity;
                      return (
                        <div
                          key={field.id}
                          className="bg-white p-4 rounded-md ring-1 ring-zinc-300"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
                            <div>
                              <label className={labelCls} htmlFor={`items-${idx}-product`}>Product</label>
                              <Controller
                                control={control}
                                name={`items.${idx}.product`}
                                render={({ field: f }) => (
                                  <select
                                    {...f}
                                    id={`items-${idx}-product`}
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
                                            <option key={p.name} value={p.name}>{p.name}</option>
                                          ))}
                                      </optgroup>
                                    ))}
                                  </select>
                                )}
                              />
                              {productErr && <p className={errorCls}>{productErr.message}</p>}
                            </div>

                            <div>
                              <label className={labelCls} htmlFor={`items-${idx}-quantity`}>Qty</label>
                              <Controller
                                control={control}
                                name={`items.${idx}.quantity`}
                                render={({ field: f }) => (
                                  <div className="flex items-center ring-1 ring-zinc-300 rounded-sm bg-white h-11">
                                    <button
                                      type="button"
                                      aria-label="Decrease quantity"
                                      className="px-3 h-full text-zinc-600 hover:text-brand"
                                      onClick={() => f.onChange(Math.max(1, Number(f.value) - 1))}
                                    >
                                      <Minus className="size-4" />
                                    </button>
                                    <input
                                      id={`items-${idx}-quantity`}
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
                                      onClick={() => f.onChange(Math.min(999, Number(f.value) + 1))}
                                    >
                                      <Plus className="size-4" />
                                    </button>
                                  </div>
                                )}
                              />
                              {qtyErr && <p className={errorCls}>{qtyErr.message}</p>}
                            </div>

                            <div>
                              <label className={labelCls} htmlFor={`items-${idx}-unit`}>Unit</label>
                              <select
                                id={`items-${idx}-unit`}
                                className={`${inputCls} pr-2`}
                                {...register(`items.${idx}.unit` as const)}
                              >
                                {UNITS.map((u) => (
                                  <option key={u} value={u}>{u}</option>
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
                    onClick={() => items.append({ product: "", quantity: 1, unit: "cu yd" })}
                    className="mt-4 inline-flex items-center gap-2 label text-zinc-900 hover:text-brand"
                  >
                    <Plus className="size-4" /> Add another product
                  </button>
                </SlideHeader>
              )}

              {step === 1 && (
                <SlideHeader title="Pickup or delivery?" helper="Pick one. We'll show delivery details if you need them.">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["Pickup", "Delivery"] as const).map((opt) => (
                      <label
                        key={opt}
                        className={`cursor-pointer rounded-md p-5 ring-1 transition-colors ${
                          fulfillment === opt
                            ? "bg-surface text-surface-foreground ring-brand"
                            : "bg-white text-zinc-900 ring-zinc-300 hover:ring-zinc-500"
                        }`}
                      >
                        <input type="radio" value={opt} {...register("fulfillment")} className="sr-only" />
                        <p className="display-4 leading-none">{opt}</p>
                        <p className={`text-sm mt-2 ${fulfillment === opt ? "text-zinc-300" : "text-zinc-600"}`}>
                          {opt === "Pickup"
                            ? "I've got a truck or trailer and I'll come grab it."
                            : "Bring it to me. I'm in Central Mass."}
                        </p>
                      </label>
                    ))}
                  </div>

                  {fulfillment === "Delivery" && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-md ring-1 ring-zinc-300">
                      <div>
                        <label className={labelCls} htmlFor="quote-town">Town</label>
                        <select id="quote-town" className={inputCls} {...register("town")}>
                          <option value="">Select town…</option>
                          {TOWNS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {formState.errors.town && (
                          <p className={errorCls}>{formState.errors.town.message as string}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="quote-zip">ZIP</label>
                        <input id="quote-zip" inputMode="numeric" maxLength={5} placeholder="01522" className={inputCls} {...register("zip")} />
                        {formState.errors.zip && (
                          <p className={errorCls}>{formState.errors.zip.message as string}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <p className={labelCls}>Where should we drop it?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {DROP_SPOTS.map((d) => (
                            <label
                              key={d}
                              className="flex items-center gap-3 bg-kraft px-3 h-11 ring-1 ring-zinc-300 rounded-sm text-sm cursor-pointer hover:ring-zinc-500 has-[:checked]:ring-brand has-[:checked]:ring-2"
                            >
                              <input type="radio" value={d} {...register("dropSpot")} className="accent-[var(--brand)]" />
                              <span className="text-zinc-900">{d}</span>
                            </label>
                          ))}
                        </div>
                        {formState.errors.dropSpot && (
                          <p className={errorCls}>{formState.errors.dropSpot.message as string}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <p className={labelCls}>When?</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TIMING.map((t) => (
                            <label
                              key={t}
                              className="flex items-center justify-center text-center bg-kraft px-2 h-11 ring-1 ring-zinc-300 rounded-sm text-xs font-semibold cursor-pointer hover:ring-zinc-500 has-[:checked]:ring-brand has-[:checked]:ring-2 has-[:checked]:text-brand text-zinc-900 uppercase tracking-wide"
                            >
                              <input type="radio" value={t} {...register("timing")} className="sr-only" />
                              {t === "As soon as possible" ? "ASAP" : t}
                            </label>
                          ))}
                        </div>
                        {formState.errors.timing && (
                          <p className={errorCls}>{formState.errors.timing.message as string}</p>
                        )}
                        {timing === "Specific date" && (
                          <input id="quote-specific-date" type="date" className={`${inputCls} mt-3`} {...register("specificDate")} />
                        )}
                        {formState.errors.specificDate && (
                          <p className={errorCls}>{formState.errors.specificDate.message as string}</p>
                        )}
                      </div>

                      <label className="md:col-span-2 flex items-start gap-3 text-sm text-zinc-800 cursor-pointer">
                        <input type="checkbox" {...register("acknowledged")} className="mt-1 size-4 accent-[var(--brand)]" />
                        <span>
                          I get the <strong>1-yard minimum</strong> and the
                          <strong> 48-hour scheduling window</strong>, and that
                          delivery is driveway or curbline only.
                        </span>
                      </label>
                      {formState.errors.acknowledged && (
                        <p className={`${errorCls} md:col-span-2`}>{formState.errors.acknowledged.message as string}</p>
                      )}
                    </div>
                  )}
                </SlideHeader>
              )}

              {step === 2 && (
                <SlideHeader title="How do we reach you?" helper="So Abby can come back with the number.">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} htmlFor="quote-name">Name</label>
                      <input id="quote-name" className={inputCls} autoComplete="name" {...register("name")} />
                      {formState.errors.name && <p className={errorCls}>{formState.errors.name.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="quote-phone">Phone</label>
                      <input id="quote-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(508) 555-0142" className={inputCls} {...register("phone")} />
                      {formState.errors.phone && <p className={errorCls}>{formState.errors.phone.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelCls} htmlFor="quote-email">Email</label>
                      <input id="quote-email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" className={inputCls} {...register("email")} />
                      {formState.errors.email && <p className={errorCls}>{formState.errors.email.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <p className={labelCls}>Best way to reach me</p>
                      <div className="grid grid-cols-3 gap-2">
                        {CONTACT_METHODS.map((m) => (
                          <label
                            key={m}
                            className="flex items-center justify-center bg-white px-2 h-11 ring-1 ring-zinc-300 rounded-sm label cursor-pointer hover:ring-zinc-500 has-[:checked]:ring-brand has-[:checked]:ring-2 has-[:checked]:text-brand text-zinc-900"
                          >
                            <input type="radio" value={m} {...register("bestContact")} className="sr-only" />
                            {m}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </SlideHeader>
              )}

              {step === 3 && (
                <SlideHeader title="Review & send" helper="Last check — then one tap fires it to Abby.">
                  <ReviewSummary data={watch()} onJump={setStep} />
                  <div className="mt-5">
                    <label className={labelCls} htmlFor="quote-notes">
                      Notes <span className="text-zinc-500 normal-case font-normal">(optional)</span>
                    </label>
                    <NotesField register={register} watch={watch} />
                    {formState.errors.notes && <p className={errorCls}>{formState.errors.notes.message}</p>}
                  </div>
                  <p className="meta text-zinc-600 mt-4 max-w-[55ch]">
                    Submitting means you agree to our{" "}
                    <Link to="/privacy" className="underline hover:text-zinc-900">Privacy &amp; Terms</Link>.
                  </p>
                </SlideHeader>
              )}
            </div>

            {/* Footer — step nav */}
            <div className="px-5 md:px-7 py-4 border-t border-zinc-300/70 bg-kraft flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 0}
                className="inline-flex items-center gap-2 label text-zinc-700 hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
              {step < STEP_LABELS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 bg-surface text-surface-foreground px-6 h-11 label hover:opacity-90 rounded-sm"
                >
                  Next <ArrowRight className="size-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-6 h-11 label hover:opacity-90 rounded-sm"
                >
                  <Send className="size-4" /> Send my request
                </button>
              )}
            </div>
          </form>
        ),
        a: (
          <Tile
            id="quote-stat-time"
            fill
            variant="stat"
            tone="surface"
            layout="anchored"
            anchorIndex="02"
            anchorGlyph={<Clock strokeWidth={1.25} />}
            value="~60s"
            label="To build a list"
          />
        ),
        b: (
          <Tile
            id="quote-stat-owner"
            fill
            variant="stat"
            tone="kraft"
            layout="anchored"
            anchorIndex="03"
            anchorGlyph={<User strokeWidth={1.25} />}
            value="1 owner"
            label="Abby answers"
          />
        ),
        c: (
          <Tile
            id="quote-img"
            fill
            variant="image"
            src={mulchHemlock}
            alt="Hemlock mulch"
            focal="center"
            loading="lazy"
            overlay={{
              eyebrow: "Materials",
              title: "From our yard",
              align: "bottom-left",
              layout: "anchored",
              anchorIcon: <Layers />,
            }}
          />
        ),
        d: (
          <Tile
            id="quote-call"
            fill
            variant="cta"
            tone="brand"
            anchorIndex="05"
            icon={<Phone />}
            eyebrow="Rather call?"
            title="508.579.9897"
            cta={{ label: "Call Abby", href: "tel:5085799897" }}
          />
        ),
      }}
    />
  );
}

function SlideHeader({
  title,
  helper,
  children,
}: {
  title: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="display-4 text-zinc-900">{title}</h2>
      {helper && <p className="body-sm text-zinc-600 mt-2 max-w-[55ch]">{helper}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ReviewSummary({
  data,
  onJump,
}: {
  data: QuoteData;
  onJump: (step: number) => void;
}) {
  const rows: Array<{ step: number; label: string; value: string }> = [];
  const itemList = (data.items ?? [])
    .filter((it) => it.product)
    .map((it) => `${it.quantity} ${it.unit} ${it.product}`)
    .join(", ");
  rows.push({ step: 0, label: "Materials", value: itemList || "—" });
  if (data.fulfillment === "Delivery") {
    const parts = [
      data.town && `${data.town}${data.zip ? ` ${data.zip}` : ""}`,
      data.dropSpot,
      data.timing === "Specific date" && data.specificDate
        ? `Specific date: ${data.specificDate}`
        : data.timing,
    ].filter(Boolean);
    rows.push({ step: 1, label: "Delivery", value: parts.join(" · ") || "—" });
  } else {
    rows.push({ step: 1, label: "Fulfillment", value: "Pickup" });
  }
  rows.push({
    step: 2,
    label: "Contact",
    value: [data.name, data.phone, data.email, `Best: ${data.bestContact}`]
      .filter(Boolean)
      .join(" · "),
  });
  return (
    <ul className="divide-y divide-zinc-300/70 bg-white rounded-md ring-1 ring-zinc-300 overflow-hidden">
      {rows.map((r) => (
        <li key={r.label} className="flex items-start gap-3 p-4">
          <div className="flex-1 min-w-0">
            <p className="eyebrow text-zinc-600 mb-1">{r.label}</p>
            <p className="text-sm text-zinc-900 break-words">{r.value}</p>
          </div>
          <button
            type="button"
            onClick={() => onJump(r.step)}
            className="shrink-0 inline-flex items-center gap-1 label text-zinc-700 hover:text-brand"
          >
            <Pencil className="size-3.5" /> Edit
          </button>
        </li>
      ))}
    </ul>
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
        id="quote-notes"
        aria-label="Notes"
        rows={3}
        maxLength={500}
        placeholder="e.g. Leave it behind the gate if I'm not home. There's a tarp marking the spot."
        className={`${inputCls} h-auto py-3 resize-y min-h-[88px]`}
        {...register("notes")}
      />
      <p className="meta text-zinc-500 mt-1 text-right tabular-nums">
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
      // ignore
    }
  };

  return (
    <TileScreen
      layout="section04"
      label="Request ready"
      tiles={{
        hero: (
          <div className="h-full w-full bg-surface text-surface-foreground rounded-md overflow-hidden flex flex-col">
            <div className="flex-1 px-6 md:px-10 py-8 md:py-12 flex flex-col justify-center">
              <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                <Check className="size-3.5" /> Request ready
              </p>
              <h1 className="display-2 leading-[0.9] max-w-[18ch]">
                Send it to <span className="text-brand">Abby.</span>
              </h1>
              <p className="mt-4 md:mt-6 text-zinc-400 max-w-[52ch]">
                One tap opens mail or messages with the full request typed up. Hit send. She's back the same day.
              </p>
            </div>
            <div className="px-6 md:px-10 pb-8 md:pb-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 bg-brand text-brand-foreground h-12 label hover:opacity-90 rounded-sm"
              >
                <Mail className="size-4" /> Email
              </a>
              <a
                href={sms}
                className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 h-12 label hover:opacity-90 rounded-sm"
              >
                <MessageSquare className="size-4" /> Text
              </a>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center justify-center gap-2 bg-kraft text-zinc-900 ring-1 ring-zinc-300 h-12 label hover:ring-zinc-500 rounded-sm"
              >
                {copied ? (
                  <><Check className="size-4" /> Copied</>
                ) : (
                  <><Copy className="size-4" /> Copy</>
                )}
              </button>
            </div>
          </div>
        ),
        a: (
          <div className="h-full w-full bg-kraft text-zinc-900 ring-1 ring-zinc-300 rounded-md overflow-hidden flex flex-col">
            <div className="px-5 py-3 border-b border-zinc-300/70 flex items-center justify-between">
              <p className="eyebrow text-zinc-700">Preview</p>
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center gap-2 label text-zinc-700 hover:text-brand"
              >
                <Pencil className="size-3.5" /> Edit
              </button>
            </div>
            <pre className="flex-1 overflow-y-auto px-5 py-4 text-xs md:text-sm text-zinc-900 whitespace-pre-wrap font-mono leading-relaxed">
              {brief}
            </pre>
          </div>
        ),
        b: (
          <Tile
            id="quote-success-call"
            fill
            variant="cta"
            tone="brand"
            icon={<Phone />}
            eyebrow="Or just call"
            title="508.579.9897"
            cta={{ label: "Call Abby", href: "tel:5085799897" }}
          />
        ),
        c: (
          <button
            type="button"
            onClick={onEdit}
            className="h-full w-full bg-white text-zinc-900 ring-1 ring-zinc-300 rounded-md hover:ring-zinc-500 inline-flex items-center justify-center gap-2 label"
          >
            <ArrowLeft className="size-4" /> Edit my request
          </button>
        ),
      }}
    />
  );
}
