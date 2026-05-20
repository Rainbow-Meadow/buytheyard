import communityCtms from "@/assets/source/community-ctms-loam.webp";
import communityRutland from "@/assets/source/community-rutland-memorial.webp";
import { TileGrid, type TileBlock } from "@/components/site/Tile";

const COMMUNITY_BLOCKS: TileBlock[] = [
  {
    id: "community-ctms",
    variant: "image",
    src: communityCtms,
    alt: "Buy The Yard dump truck unloading a pile of dark loam at Central Tree Middle School",
    size: "md",
    aspect: "square",
    focal: "center",
    overlay: {
      title: "CTMS · loam + mulch donation",
      align: "bottom-left",
    },
    details: {
      shareId: "community-ctms",
      eyebrow: "Central Tree Middle School · Jun 26, 2024",
      title: "Loam and mulch for CTMS",
      body: "Thank you to former CTMS Student and owner of Buy The Yard Outdoor Products Abby Montalto for her generosity. Loam has been delivered and mulch is on the way.",
    },
  },
  {
    id: "community-rutland-memorial",
    variant: "image",
    src: communityRutland,
    alt: "American flags and a memorial flower bed at the Rutland Public Safety building on Memorial Day",
    size: "md",
    aspect: "square",
    focal: "center",
    overlay: {
      title: "Rutland Public Safety · Memorial Day",
      align: "bottom-left",
    },
    details: {
      shareId: "community-rutland-memorial",
      eyebrow: "Rutland Fire Department · May 22, 2020",
      title: "Memorial Day at the public safety building",
      body: "Just wanted to say thank you to the following local businesses that have helped out to make the public safety building look amazing for this Memorial Day. Wildwood Lawn Care, Buy The Yard Outdoor Products, Sterling Irrigation, and the Patterson Family.",
    },
  },
];

export default function CommunityTiles() {
  return <TileGrid blocks={COMMUNITY_BLOCKS} />;
}