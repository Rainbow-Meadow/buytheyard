// Desktop-only copy. Not shared with the mobile bundle.

export const brand = {
  phone: "508.579.9897",
  phoneTel: "5085799897",
  address: "2264 Main St., Jefferson, MA 01522",
  hours: [
    { day: "Mon – Fri", time: "8a – 5p" },
    { day: "Saturday", time: "8a – 3p" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const home = {
  eyebrow: "Est. 1998 · Woman Owned",
  headline: { lead: "The Art of", emphasis: "The Yard." },
  sub: "Premium bulk mulch, loam, sand, and stone delivered across Central Massachusetts with professional care.",
  feature: { title: "Premium Mulch", meta: "Triple Ground · Aged Hemlock" },
  pull: "We believe the foundation of every great landscape starts with the best raw materials.",
  pullMeta: "Jefferson's Finest",
  accent: { title: "Specialty Stone", caption: "River · Lava · Pea" },
  ticker: ["Organic Loam", "Washed Sand", "River Stone", "Aged Bark", "Tailored Delivery"],
};

export const products = [
  { name: "Hemlock Mulch", category: "Mulch", note: "Triple ground · aged" },
  { name: "Premium Black Mulch", category: "Mulch", note: "Color-enhanced" },
  { name: "Dark Brown Mulch", category: "Mulch", note: "Bark blend" },
  { name: "Screened Loam", category: "Loam", note: "1/2\" screened" },
  { name: "Compost & Plant Mix", category: "Loam", note: "Aged organic" },
  { name: "Mason Sand", category: "Sand", note: "Pool & paver base" },
  { name: "Crushed Stone", category: "Gravel", note: "3/4\" processed" },
  { name: "Pea Gravel", category: "Gravel", note: "Decorative" },
  { name: "River Stone", category: "Specialty Stone", note: "Naturally smooth" },
  { name: "Lava Rock", category: "Specialty Stone", note: "Volcanic red" },
  { name: "Playground Chips", category: "Specialty", note: "ASTM certified" },
  { name: "Annuals & Hanging Baskets", category: "Garden Center", note: "Seasonal" },
] as const;

export const deliveryZones = [
  "Jefferson", "Holden", "Worcester", "Princeton", "Sterling", "Rutland",
  "Paxton", "West Boylston", "Boylston", "Leominster", "Clinton", "Lancaster",
  "Spencer", "Auburn", "Shrewsbury",
];