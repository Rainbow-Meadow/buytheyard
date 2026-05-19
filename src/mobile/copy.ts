export const mBrand = {
  phone: "508-579-9897",
  phoneTel: "5085799897",
  address: "2264 Main St., Jefferson, MA",
};

export const mHome = {
  eyebrow: "Jefferson, MA",
  headline: "Bulk material. By the yard.",
  sub: "Mulch, loam, sand & stone — picked up the same day or dropped at your driveway.",
  cta: "Call the yard",
  shopCta: "Shop materials",
};

import mulchImg from "@/assets/mulch-hemlock.webp";
import stoneImg from "@/assets/stone-river.webp";
import loamImg from "@/assets/loam.webp";
import sandImg from "@/assets/sand.webp";
import yardImg from "./assets/m-contact-yard.jpg";

export const mYardImg = yardImg;

export const mProducts = [
  { name: "Mulch", img: mulchImg, alt: "Pile of fresh dark hemlock mulch", note: "Hemlock · black · brown" },
  { name: "Stone", img: stoneImg, alt: "Wet river and crushed stone", note: "River · lava · crushed" },
  { name: "Loam", img: loamImg, alt: "Pile of screened loam topsoil", note: "Screened · compost mix" },
  { name: "Sand", img: sandImg, alt: "Smooth pile of mason sand", note: "Mason · pool · pea" },
];

// Brandmark palette rotation across mobile product tiles.
export function mCategoryAccent(name: string): string {
  switch (name) {
    case "Mulch":
      return "text-m-gold";
    case "Loam":
      return "text-m-tan";
    case "Sand":
      return "text-m-tan-soft";
    case "Stone":
    default:
      return "text-m-gray";
  }
}