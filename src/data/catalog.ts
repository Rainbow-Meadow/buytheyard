import type { CatalogItem } from "@/components/site/sections/archetypes/ProductCatalogSection";
import type { DeliveryZone } from "@/components/site/sections/archetypes/DeliveryPricingSection";
import {
  largePileOfDarkMulch,
  largePileOfBlackMulch,
  largePileOfRedMulch,
  dumpTruckBedFullOfBrownMulch,
  tanPeaGravelWithCoinCloseup,
  darkRiverRocksWithGolfBallCloseup,
  reddishBrownLandscapeStoneWithCoinCloseup,
  mixedLandscapeStoneSamplesOnGround,
  largePileOfLightSand,
  paleTanCrushedStoneWithPennyCloseup,
  lightGrayGravelWithQuarterCloseup,
  grayRiverStonesWithGolfBallCloseup,
  lightGrayCrushedRockWithQuarterCloseup,
  mixedGrayAndWhiteGravelWithCoinCloseup,
} from "@/assets/photos";

// NOTE: Prices are placeholders modeled on regional yard pricing — edit as Buy The Yard confirms.

export const MULCH: CatalogItem[] = [
  { name: "Brown Pine Mulch", description: "Classic double-ground brown. Long-lasting color, holds moisture, suppresses weeds.", price: "$42.00", unit: "per yd", image: largePileOfDarkMulch },
  { name: "Black Pine Mulch", description: "Deep black double-ground. The cleanest contrast against green plantings.", price: "$42.00", unit: "per yd", image: largePileOfBlackMulch },
  { name: "Hemlock Mix", description: "Premium hemlock blend with a fine texture and a rich, natural brown.", price: "$42.00", unit: "per yd", image: largePileOfRedMulch },
  { name: "Playground Mulch", description: "Engineered wood fiber. ASTM-tested for fall-zone safety under play sets.", price: "$45.00", unit: "per yd", image: dumpTruckBedFullOfBrownMulch },
];

export const STONE: CatalogItem[] = [
  { name: "1-1/2\" Landscaping Stone", description: "Decorative landscape stone in 1-1/2\" size. Available in brown, blue, and dark gray.", price: "$95.00", unit: "per yd", image: darkRiverRocksWithGolfBallCloseup },
  { name: "3/4\" Landscaping Stone", description: "Our most versatile size. Available in brown, blue, white, red, purple, dark gray, and light gray.", price: "$95.00", unit: "per yd", image: reddishBrownLandscapeStoneWithCoinCloseup },
  { name: "3/8\" Landscaping Stone", description: "Smooth, finer-scale decorative stone. Available in brown, blue, dark gray, and light gray.", price: "$95.00", unit: "per yd", image: tanPeaGravelWithCoinCloseup },
];

export const ADDITIONAL: CatalogItem[] = [
  // TODO: replace with real screened-loam photo
  { name: "1/2\" Screened Loam", description: "Premium screened topsoil for lawns, gardens, and grading work.", price: "$32.00", unit: "per yd", image: mixedLandscapeStoneSamplesOnGround },
  { name: "Brick / Mason Sand", description: "Fine, washed sand for masonry, paver setting beds, and play boxes.", price: "$68.00", unit: "per yd", image: largePileOfLightSand },
  { name: "Stone Dust", description: "Crushed stone fines. Compacts hard — ideal under pavers and stone.", price: "$35.00", unit: "per yd", image: paleTanCrushedStoneWithPennyCloseup },
  { name: "3/4\" Gravel", description: "Processed gravel for base layers, drainage, and parking pads.", price: "$35.00", unit: "per yd", image: lightGrayGravelWithQuarterCloseup },
  // TODO: replace with real wood chips photo
  { name: "Wood Chips", description: "Coarse natural wood chips. Bulk ground cover for trails and beds.", price: "$12.00", unit: "per yd", image: grayRiverStonesWithGolfBallCloseup },
  { name: "Recycled Asphalt", description: "Reclaimed asphalt millings. Affordable, durable driveway surface.", price: "$30.00", unit: "per yd", image: lightGrayCrushedRockWithQuarterCloseup },
  // TODO: replace with real compost photo
  { name: "Compost", description: "Aged organic compost. Mix into beds or top-dress lawns.", price: "$48.00", unit: "per yd", image: mixedGrayAndWhiteGravelWithCoinCloseup },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { town: "Jefferson", fee: "$35" },
  { town: "Holden", fee: "$45" },
  { town: "Princeton", fee: "$55" },
  { town: "Sterling", fee: "$55" },
  { town: "West Boylston", fee: "$55" },
  { town: "Rutland", fee: "$60" },
  { town: "Paxton", fee: "$65" },
  { town: "Boylston", fee: "$65" },
  { town: "Clinton", fee: "$75" },
  { town: "Leominster", fee: "$80" },
  { town: "Worcester", fee: "$85" },
  { town: "Shrewsbury", fee: "$90" },
];