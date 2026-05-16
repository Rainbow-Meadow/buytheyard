export type Promo = {
  title: string;
  body: string;
  active: boolean;
};

// Edit this list to update what the AI chat tells visitors about current promos.
export const promos: Promo[] = [
  {
    title: "Mother's Day hanging baskets",
    body: "Hand-built hanging baskets on the wagon out front. $40 each, or 2 for $70. Limited quantity — call 508-579-9897 to reserve.",
    active: true,
  },
  {
    title: "May WooSox ticket raffle",
    body: "Order 5+ yards of mulch in May (pickup or delivery) and you're automatically entered into our weekly WooSox ticket drawing. Four winners every Friday in May.",
    active: true,
  },
];