import mulchBlack from "@/assets/mulch-black.webp";
import mulchHemlock from "@/assets/mulch-hemlock.webp";
import mulchPine from "@/assets/mulch-pine.webp";
import loam from "@/assets/loam.webp";
import sand from "@/assets/sand.webp";
import stoneBlue from "@/assets/stone-blue.webp";
import stoneRiver from "@/assets/stone-river.webp";
import stoneLava from "@/assets/stone-lava.webp";
import stonePea from "@/assets/stone-pea.webp";
import gardenBaskets from "@/assets/garden-baskets.webp";
import gardenAnnuals from "@/assets/garden-annuals.webp";
import gardenSoil from "@/assets/garden-soil.webp";
import playgroundChips from "@/assets/playground-chips.webp";

export type Product = {
  name: string;
  category:
    | "Mulch"
    | "Loam"
    | "Sand"
    | "Gravel"
    | "Specialty Stone"
    | "Garden Center"
    | "Specialty";
  description: string;
  image: string;
  badge?: string;
};

export const products: Product[] = [
  {
    name: "Premium Black Mulch",
    category: "Mulch",
    description: "Deep, color-fast black mulch. Double-shredded for clean beds and strong contrast against greenery.",
    image: mulchBlack,
  },
  {
    name: "Hemlock Mulch",
    category: "Mulch",
    description: "Rich red-brown hemlock bark. Naturally aromatic and a New England landscape staple.",
    image: mulchHemlock,
  },
  {
    name: "Dark Brown Mulch",
    category: "Mulch",
    description: "Rich, deep-brown shredded mulch. Holds color through the season and frames beds with a clean, finished look.",
    image: mulchPine,
  },
  {
    name: "Screened Loam",
    category: "Loam",
    description: "Nutrient-dense topsoil screened to 1/2\". Ideal for new lawns, gardens, and re-grading.",
    image: loam,
  },
  {
    name: "Mason Sand",
    category: "Sand",
    description: "Clean, washed fine sand. Perfect under pavers, in playboxes, and for masonry mixes.",
    image: sand,
  },
  {
    name: "3/4\" Crushed Blue Stone",
    category: "Gravel",
    description: "Angular crushed stone that locks together under load. The standard for driveways and drainage.",
    image: stoneBlue,
  },
  {
    name: "3/8\" Pea Stone",
    category: "Gravel",
    description: "Smooth, small-grade pebbles. Great for walkways, drainage, and decorative ground cover.",
    image: stonePea,
  },
  {
    name: "River Stone",
    category: "Specialty Stone",
    description: "Naturally rounded mixed stones. A clean, decorative finish for beds and dry stream beds.",
    image: stoneRiver,
  },
  {
    name: "Red Lava Rock",
    category: "Specialty Stone",
    description: "Bold red volcanic stone. Holds color for years and adds dramatic accent to landscaping.",
    image: stoneLava,
  },
  {
    name: "Hanging Baskets",
    category: "Garden Center",
    description:
      "Lush hanging baskets bursting with petunias and trailing greenery. Built on-site at the flower wagon — switched out fresh as the season turns.",
    image: gardenBaskets,
    badge: "Seasonal · $25",
  },
  {
    name: "Annuals & Perennials",
    category: "Garden Center",
    description:
      "Hydrangeas, dahlias, and seasonal favorites in nursery pots. Hydrangeas from $22, dahlias from $18 — selection rotates with what's in bloom.",
    image: gardenAnnuals,
  },
  {
    name: "Plant Mix & Compost",
    category: "Garden Center",
    description:
      "Rich, organic plant mix and bulk compost for raised beds, vegetable gardens, and tired soil. Sold by the yard, scoop, or bucket.",
    image: gardenSoil,
  },
  {
    name: "ASTM Playground Chips",
    category: "Specialty",
    description:
      "Engineered wood-fiber surfacing produced to playground safety specs. ASTM F1292 fall impact, F2075 metals-free, F1951 wheelchair accessible.",
    image: playgroundChips,
    badge: "ASTM Certified",
  },
];

export const categories = [
  "Mulch",
  "Loam",
  "Sand",
  "Gravel",
  "Specialty Stone",
  "Garden Center",
  "Specialty",
] as const;