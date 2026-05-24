export function formatPrice(cents: number): string {
  const dollars = (cents / 100).toFixed(2);
  return `$${dollars}`;
}

/** Parse a dollar string like "42", "42.5", "$42.00" into integer cents. */
export function parseDollarsToCents(input: string): number | null {
  const cleaned = input.replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const n = Math.round(parseFloat(cleaned) * 100);
  return Number.isFinite(n) ? n : null;
}