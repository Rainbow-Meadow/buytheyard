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
  Home,
  Layers,
  Mail,
  MessageSquare,
  Minus,
  Pencil,
  Phone,
  Plus,
  Send,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { products, categories } from "@/data/products";
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
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/quote" },
    ],
  }),
  component: QuotePage,
});

// --- Anchored-tile chrome utilities ---------------------------------
// Sub-tiles live on a `surface` toned form card, so controls sit on a
// translucent white wash with a hairline ring (same rule weight as the
// rest of the site's anchored tiles).
const inputCls =
  "w-full bg-white/5 text-surface-foreground placeholder:text-white/40 px-3 h-11 ring-1 ring-white/15 text-sm focus:outline-none focus:ring-2 focus:ring-brand";
const labelCls = "eyebrow text-white/60 mb-2 block";
const errorCls = "text-xs text-red-400 mt-1";

// Reusable sub-tile shell — borrows the anchored-tile visual vocabulary
// without authoring an actual <Tile> (which would trigger TileRules).
const subTileCls =
  "relative overflow-hidden bg-white/5 ring-1 ring-white/15 p-4 md:p-5";

const sortedProducts = [...products].sort((a, b) => {
  const ca = categories.indexOf(a.category);
  const cb = categories.indexOf(b.category);
  if (ca !== cb) return ca - cb;
  return a.name.localeCompare(b.name);
});

type StepMeta = { num: string; eyebrow: string; title: string; helper: string };
const STEPS: StepMeta[] = [
  {
    num: "01",
    eyebrow: "Materials",
    title: "What do you need?",
    helper: "One row per material. Ballpark the quantity — we dial it in on the phone.",
  },
  {
    num: "02",
    eyebrow: "Fulfillment",
    title: "Pickup or delivery?",
    helper: "Pick one. We'll show delivery details if you need them.",
  },
  {
    num: "03",
    eyebrow: "Contact",
    title: "How do we reach you?",
    helper: "So Abby can come back with the number.",
  },
  {
    num: "04",
    eyebrow: "Review",
    title: "Review & send.",
    helper: "Last check — then one tap fires it to Abby.",
  },
];

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
    if (ok) setStep((s) => Math.min(STEPS.length - 1, s + 1));
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

  const meta = STEPS[step];

  return (
    <TileScreen
      layout="pageHero"
      label="Build a quote"
      heading="Build a quote for bulk materials"
      headingLevel="h1"
      tiles={{
        hero: (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="h-full w-full bg-surface text-surface-foreground overflow-hidden flex flex-col"
          >
            {/* Header — anchored numeral + pip rail */}
            <div className="relative px-5 md:px-7 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-white/10 overflow-hidden">
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow text-brand">
                    Step {String(step + 1).padStart(2, "0")} · {meta.eyebrow}
                  </p>
                  <h2 className="display-5 md:display-4 mt-2 text-surface-foreground">{meta.title}</h2>
                  {meta.helper && (
                    <p className="body-sm text-white/60 mt-1.5 max-w-[55ch] line-clamp-2">{meta.helper}</p>
                  )}
                </div>
                <p
                  aria-hidden="true"
                  className="display-2 md:display-1 leading-none text-white/[0.06] tabular-nums select-none pointer-events-none -mt-1 -mr-1"
                >
                  {meta.num}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <button
                    key={s.num}
                    type="button"
                    onClick={async () => {
                      if (i <= step) {
                        setStep(i);
                      } else {
                        for (let ss = step; ss < i; ss++) {
                          // eslint-disable-next-line no-await-in-loop
                          const ok = await validateStep(ss);
                          if (!ok) {
                            setStep(ss);
                            return;
                          }
                        }
                        setStep(i);
                      }
                    }}
                    aria-label={`Go to step ${i + 1}: ${s.eyebrow}`}
                    aria-current={i === step}
                    className={`h-px flex-1 transition-colors ${
                      i === step
                        ? "bg-brand h-0.5"
                        : i < step
                          ? "bg-white/50"
                          : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slide content — scrollable inside the tile */}
            <div className="flex-1 overflow-y-auto px-5 md:px-7 py-3 md:py-5">
              {step === 0 && (
                <div className="space-y-3">
                  {items.fields.map((field, idx) => {
                    const productErr = formState.errors.items?.[idx]?.product;
                    const qtyErr = formState.errors.items?.[idx]?.quantity;
                    return (
                      <div key={field.id} className={subTileCls}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <p className="eyebrow text-brand tabular-nums">
                            Item · {String(idx + 1).padStart(2, "0")}
                          </p>
                          <button
                            type="button"
                            aria-label="Remove product"
                            disabled={items.fields.length === 1}
                            onClick={() => items.remove(idx)}
                            className="inline-flex items-center gap-1 label text-white/50 hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="size-3.5" /> Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 items-end">
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
                                <div className="flex items-center ring-1 ring-white/15 bg-white/5 h-11">
                                  <button
                                    type="button"
                                    aria-label="Decrease quantity"
                                    className="px-3 h-full text-white/60 hover:text-brand"
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
                                    className="w-14 text-center bg-transparent text-surface-foreground text-sm font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                  <button
                                    type="button"
                                    aria-label="Increase quantity"
                                    className="px-3 h-full text-white/60 hover:text-brand"
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
                        </div>

                        {/* Ghost glyph */}
                        <Layers
                          aria-hidden="true"
                          strokeWidth={1.25}
                          className="pointer-events-none absolute -bottom-4 -right-3 z-0 size-28 md:size-32 text-white/[0.05]"
                        />
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => items.append({ product: "", quantity: 1, unit: "cu yd" })}
                    className="w-full inline-flex items-center justify-center gap-2 label text-white/70 hover:text-brand bg-transparent ring-1 ring-dashed ring-white/15 hover:ring-white/30 h-12 transition-colors"
                  >
                    <Plus className="size-4" /> Add another product
                  </button>
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(
                      [
                        {
                          opt: "Pickup",
                          eyebrow: "Option 01",
                          helper: "I've got a truck or trailer and I'll come grab it.",
                          Icon: Truck,
                        },
                        {
                          opt: "Delivery",
                          eyebrow: "Option 02",
                          helper: "Bring it to me. I'm in Central Mass.",
                          Icon: Home,
                        },
                      ] as const
                    ).map(({ opt, eyebrow, helper, Icon }) => {
                      const selected = fulfillment === opt;
                      return (
                        <label
                          key={opt}
                          className={`relative overflow-hidden cursor-pointer p-5 min-h-[112px] md:min-h-[140px] flex flex-col justify-between ring-1 transition-colors ${
                            selected
                              ? "bg-brand text-brand-foreground ring-brand"
                              : "bg-white/5 text-surface-foreground ring-white/15 hover:ring-white/40"
                          }`}
                        >
                          <input type="radio" value={opt} {...register("fulfillment")} className="sr-only" />
                          <p
                            className={`eyebrow ${selected ? "text-brand-foreground/80" : "text-brand"}`}
                          >
                            {eyebrow}
                          </p>
                          <div className="relative z-10">
                            <p className="display-4 leading-none">{opt}</p>
                            <p
                              className={`body-sm mt-2 ${selected ? "text-brand-foreground/85" : "text-white/65"}`}
                            >
                              {helper}
                            </p>
                          </div>
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.25}
                            className={`pointer-events-none absolute -bottom-4 -right-3 z-0 size-32 md:size-40 ${
                              selected ? "text-brand-foreground/15" : "text-white/[0.06]"
                            }`}
                          />
                        </label>
                      );
                    })}
                  </div>

                  {fulfillment === "Delivery" && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className={subTileCls}>
                        <label className={labelCls} htmlFor="quote-town">Town</label>
                        <select id="quote-town" className={inputCls} {...register("town")}>
                          <option value="">Select town…</option>
                          {TOWNS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {formState.errors.town && (
                          <p className={errorCls}>{formState.errors.town.message as string}</p>
                        )}
                      </div>
                      <div className={subTileCls}>
                        <label className={labelCls} htmlFor="quote-zip">ZIP</label>
                        <input id="quote-zip" inputMode="numeric" maxLength={5} placeholder="01522" className={inputCls} {...register("zip")} />
                        {formState.errors.zip && (
                          <p className={errorCls}>{formState.errors.zip.message as string}</p>
                        )}
                      </div>

                      <div className={`${subTileCls} md:col-span-2`}>
                        <p className={labelCls}>Where should we drop it?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {DROP_SPOTS.map((d) => (
                            <label
                              key={d}
                              className="flex items-center gap-3 bg-white/5 px-3 h-11 ring-1 ring-white/15 text-sm cursor-pointer hover:ring-white/40 has-[:checked]:ring-brand has-[:checked]:ring-2 has-[:checked]:bg-brand/10 transition-colors"
                            >
                              <input type="radio" value={d} {...register("dropSpot")} className="accent-[var(--brand)]" />
                              <span className="text-surface-foreground">{d}</span>
                            </label>
                          ))}
                        </div>
                        {formState.errors.dropSpot && (
                          <p className={errorCls}>{formState.errors.dropSpot.message as string}</p>
                        )}
                      </div>

                      <div className={`${subTileCls} md:col-span-2`}>
                        <p className={labelCls}>When?</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TIMING.map((t) => (
                            <label
                              key={t}
                              className="flex items-center justify-center text-center bg-white/5 px-2 h-11 ring-1 ring-white/15 text-xs font-semibold cursor-pointer hover:ring-white/40 has-[:checked]:ring-brand has-[:checked]:ring-2 has-[:checked]:text-brand text-surface-foreground uppercase tracking-wide transition-colors"
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

                      <label className="md:col-span-2 flex items-start gap-3 text-sm text-white/80 cursor-pointer px-1">
                        <input type="checkbox" {...register("acknowledged")} className="mt-1 size-4 accent-[var(--brand)]" />
                        <span>
                          I get the <strong className="text-surface-foreground">1-yard minimum</strong> and the
                          <strong className="text-surface-foreground"> 48-hour scheduling window</strong>, and that
                          delivery is driveway or curbline only.
                        </span>
                      </label>
                      {formState.errors.acknowledged && (
                        <p className={`${errorCls} md:col-span-2`}>{formState.errors.acknowledged.message as string}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div className={subTileCls}>
                    <p className="eyebrow text-brand mb-4">Your details</p>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <User
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="pointer-events-none absolute -bottom-4 -right-3 z-0 size-32 md:size-40 text-white/[0.05]"
                    />
                  </div>

                  <div className={subTileCls}>
                    <p className={labelCls}>Best way to reach me</p>
                    <div className="grid grid-cols-3 gap-2">
                      {CONTACT_METHODS.map((m) => {
                        const Icon = m === "Call" ? Phone : m === "Text" ? MessageSquare : Mail;
                        return (
                          <label
                            key={m}
                            className="flex flex-col items-center justify-center gap-1 bg-white/5 px-2 py-3 ring-1 ring-white/15 label cursor-pointer hover:ring-white/40 has-[:checked]:ring-brand has-[:checked]:ring-2 has-[:checked]:text-brand text-surface-foreground transition-colors"
                          >
                            <input type="radio" value={m} {...register("bestContact")} className="sr-only" />
                            <Icon className="size-4" strokeWidth={1.5} />
                            <span>{m}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <ReviewSummary data={watch()} onJump={setStep} />
                  <div className={subTileCls}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="eyebrow text-brand" htmlFor="quote-notes">
                        Notes <span className="text-white/40 normal-case font-normal tracking-normal">(optional)</span>
                      </label>
                    </div>
                    <NotesField register={register} watch={watch} />
                    {formState.errors.notes && <p className={errorCls}>{formState.errors.notes.message}</p>}
                  </div>
                  <p className="meta text-white/55 mt-2 max-w-[55ch]">
                    Submitting means you agree to our{" "}
                    <Link to="/privacy" className="underline hover:text-surface-foreground">Privacy &amp; Terms</Link>.
                  </p>
                </div>
              )}
            </div>

            {/* Footer — step nav */}
            <div className="px-5 md:px-7 py-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 0}
                className="inline-flex items-center gap-2 label text-white/60 hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 bg-white text-zinc-900 px-7 h-12 label hover:opacity-90"
                >
                  Next <ArrowRight className="size-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90"
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
            variant="text"
            tone="surface"
            layout="anchored"
            anchorIndex="01"
            icon={<Clock />}
            eyebrow="Fast"
            title="About a minute"
            body="Build your list, drop your contact info, send. Quick + easy."
          />
        ),
        b: (
          <Tile
            id="quote-stat-owner"
            fill
            variant="text"
            tone="kraft"
            layout="anchored"
            anchorIndex="02"
            icon={<User />}
            eyebrow="One owner"
            title="Abby answers"
            body="No call center, no ticket queue — your quote goes straight to her."
          />
        ),
        c: (
          <Tile
            id="quote-img"
            fill
            variant="text"
            tone="kraft"
            layout="anchored"
            icon={<Layers />}
            eyebrow="Materials"
            title="From our yard"
            body="Mulch, loam, sand, gravel, and stone — by the yard, from Jefferson."
          />
        ),
        d: (
          <Tile
            id="quote-call"
            fill
            variant="cta"
            tone="brand"
            anchorIndex="04"
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
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className="relative bg-white/5 ring-1 ring-white/15 p-4 flex items-start gap-3"
        >
          <div className="flex-1 min-w-0">
            <p className="eyebrow text-brand mb-1">{r.label}</p>
            <p className="text-sm text-surface-foreground break-words">{r.value}</p>
          </div>
          <button
            type="button"
            onClick={() => onJump(r.step)}
            className="shrink-0 inline-flex items-center gap-1 label text-white/60 hover:text-brand"
          >
            <Pencil className="size-3.5" /> Edit
          </button>
        </div>
      ))}
    </div>
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
      <p className="meta text-white/45 mt-1 text-right tabular-nums">
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
          <div className="h-full w-full bg-surface text-surface-foreground overflow-hidden flex flex-col">
            <div className="flex-1 px-6 md:px-10 py-8 md:py-12 flex flex-col justify-center">
              <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                <Check className="size-3.5" /> Request ready
              </p>
              <h1 className="display-2 leading-[0.9] max-w-[18ch]">
                Send it to <span className="text-brand">Abby.</span>
              </h1>
              <p className="mt-4 md:mt-6 text-white/60 max-w-[52ch]">
                One tap opens mail or messages with the full request typed up. Hit send. She's back the same day.
              </p>
            </div>
            <div className="px-6 md:px-10 pb-8 md:pb-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 bg-brand text-brand-foreground h-12 label hover:opacity-90"
              >
                <Mail className="size-4" /> Email
              </a>
              <a
                href={sms}
                className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 h-12 label hover:opacity-90"
              >
                <MessageSquare className="size-4" /> Text
              </a>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-surface-foreground ring-1 ring-white/15 h-12 label hover:ring-white/40 transition-colors"
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
          <div className="h-full w-full bg-kraft text-zinc-900 ring-1 ring-zinc-300 overflow-hidden flex flex-col">
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
            className="h-full w-full bg-white text-zinc-900 ring-1 ring-zinc-300 hover:ring-zinc-500 inline-flex items-center justify-center gap-2 label"
          >
            <ArrowLeft className="size-4" /> Edit my request
          </button>
        ),
      }}
    />
  );
}