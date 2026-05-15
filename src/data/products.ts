import mulchBlack from "@/assets/mulch-black.webp";
import mulchHemlock from "@/assets/mulch-hemlock.webp";
import mulchPine from "@/assets/mulch-pine.webp";
import loam from "@/assets/loam.webp";
import sand from "@/assets/sand.webp";
import stoneBlue from "@/assets/stone-blue.webp";
import stoneRiver from "@/assets/stone-river.webp";
import stoneLava from "@/assets/stone-lava.webp";
import stonePea from "@/assets/stone-pea.webp";

export type Product = {
  name: string;
  category: "Mulch" | "Loam" | "Sand" | "Gravel" | "Specialty Stone";
  description: string;
  image: string;
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
];

export const categories = [
  "Mulch",
  "Loam",
  "Sand",
  "Gravel",
  "Specialty Stone",
] as const;