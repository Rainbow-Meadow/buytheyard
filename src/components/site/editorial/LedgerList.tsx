import { cn } from "@/lib/utils";

export interface LedgerRow {
  label: string;
  value: string;
}

/**
 * Key / value rows separated by hairlines. Mono keys, plain values.
 * Used for spec sheets, "stats at a glance", and short fact lists.
 */
export function LedgerList({
  rows,
  className,
}: {
  rows: LedgerRow[];
  className?: string;
}) {
  return (
    <dl className={cn("divide-y divide-[var(--rule)]", className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-6 py-2.5"
        >
          <dt className="font-mono-meta text-zinc-500">{row.label}</dt>
          <dd className="body-sm text-zinc-900 text-right">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}