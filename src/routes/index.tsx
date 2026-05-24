import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  MaterialInventorySection,
  OwnerStorySection,
  TestimonialsSection,
  GalleryMarqueeSection,
  ServiceAreaSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { SERVICE_AREA_TOWNS } from "@/data/service-area";
import {
  dumpTruckDeliveringDarkMulch,
  landscapeSupplyYardWithFlowersAndMaterialBins,
  coveredGardenCenterFlowerDisplay,
  colorfulHangingFlowerBasketCloseup,
  outdoorChrysanthemumFlowerDisplay,
  pottedPurpleAndYellowPansiesOnPatio,
  gardenCenterToolAndHardwareDisplay,
  wallMountedGardenToolsAndLeafBlowers,
  dumpTruckUnloadingBlackMulch,
  wheelLoaderLoadingBlackMulchIntoDumpTruck,
  dumpTruckPouringRedMulch,
  freshMulchBedAlongSuburbanHouse,
  brownDogWearingHarnessLookingOutWindow,
  catMulchBg,
  catStoneBg,
  catSandLoamBg,
  catGardenCenterBg,
} from "@/assets/photos";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buy The Yard — Mulch, Stone, Sand & Loam · Jefferson, MA" },
      {
        name: "description",
        content:
          "Family-run materials yard on 122A in Jefferson, MA. Mulch, stone, sand, loam, and a flower wagon out front. Pickup or delivery across Central Mass. Call 508-579-9897.",
      },
      { property: "og:title", content: "Buy The Yard — On 122A in Jefferson, MA" },
      {
        property: "og:description",
        content:
          "Mulch, stone, sand, loam, and a garden center on 122A in Jefferson. Loading trucks for Central Mass since 2016.",
      },
      { property: "og:url", content: "https://buytheyard.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/" }],
  }),
  component: HomePage,
});
function HomePage() {
  return (
    <main aria-label="Home" className="font-barlow">
      <HeroSection
        meta="JEFFERSON, MA · ON 122A SINCE 2016"
        heading={<>Mulch. Stone.<br/>Sand & Loam.</>}
        body="A woman-owned yard on 122A in Jefferson. Mulch, stone, sand, loam, and a flower wagon out front. Pull in with a truck, or we drop it where you want it."
        ctaLabel="Shop Mulch"
        ctaTo="/mulch"
        image={dumpTruckDeliveringDarkMulch}
        imageAlt="Buy The Yard truck delivering fresh dark mulch"
        imagePosition="object-[75%_center]"
      />
      <MaterialInventorySection
        items={[
          { code: "CAT_01", name: "Mulch", description: "Hemlock, brown, black, red, playground. Double-ground and dyed to hold color through August.", unit: "CUBIC YARD", to: "/mulch", icon: "mulch", image: catMulchBg, imageAlt: "Piles of brown, black, and red mulch in concrete bins" },
          { code: "CAT_02", name: "Stone", description: "3/4\" crush for the driveway, pea stone for the path, river rock for the dry creek. Three sizes, plenty of colors.", unit: "TON / CY", to: "/stone", icon: "stone", image: catStoneBg, imageAlt: "Piles of gravel and river stone in concrete bins" },
          { code: "CAT_03", name: "Sand & Loam", description: "Screened loam for a new lawn, mason sand for the patio, stone dust for the base. The stuff every job needs.", unit: "CUBIC YARD", to: "/additional", icon: "additional", image: catSandLoamBg, imageAlt: "Piles of sand and dark loam in concrete bins" },
          { code: "CAT_04", name: "Garden Center", description: "Hanging baskets, annuals, mums on the hay bales in the fall, and the tools to plant them. Walk the wagon, pick what you like.", unit: "AT THE YARD", to: "/garden-center", icon: "garden-center", image: catGardenCenterBg, imageAlt: "Flower wagon under the wooden pergola at the yard" },
        ]}
      />
      <OwnerStorySection
        heading={<>Woman-Owned.<br/>WBE Certified.</>}
        body="Buy The Yard opened in Jefferson in 2016 and is certified WBE by the Commonwealth. A woman running a materials yard in a business that doesn't see many — and we like it that way."
        badges={["WBE", "MASS"]}
      />
      <GalleryMarqueeSection
        items={[
          { src: landscapeSupplyYardWithFlowersAndMaterialBins, alt: "The Jefferson yard with material bins and flowers" },
          { src: coveredGardenCenterFlowerDisplay, alt: "Covered garden center flower display" },
          { src: colorfulHangingFlowerBasketCloseup, alt: "Hand-built hanging flower basket" },
          { src: outdoorChrysanthemumFlowerDisplay, alt: "Fall mums on display" },
          { src: pottedPurpleAndYellowPansiesOnPatio, alt: "Potted pansies on the patio" },
          { src: gardenCenterToolAndHardwareDisplay, alt: "Garden tools and hardware on the wall" },
          { src: wallMountedGardenToolsAndLeafBlowers, alt: "Long-handle tools and leaf blowers" },
          { src: dumpTruckUnloadingBlackMulch, alt: "Dump truck unloading black mulch" },
          { src: wheelLoaderLoadingBlackMulchIntoDumpTruck, alt: "Wheel loader filling a truck with mulch" },
          { src: dumpTruckPouringRedMulch, alt: "Truck pouring red mulch into a driveway" },
          { src: freshMulchBedAlongSuburbanHouse, alt: "Fresh mulch bed framing a home" },
          { src: brownDogWearingHarnessLookingOutWindow, alt: "Shop dog on the job" },
        ]}
      />
      <TestimonialsSection
        items={[
          { quote: "Best mulch around. Clean load, dropped right where I marked it.", attribution: "MARK S. · HOLDEN" },
          { quote: "They get our crews loaded and out fast. Same-day when we need it.", attribution: "GREEN LANDSCAPE INC." },
        ]}
      />
      <ServiceAreaSection
        heading={<>Central Mass<br/>Delivery.</>}
        body="Trucks roll out of the Jefferson yard. If you're inside about 40 minutes of us, we can usually get a load to you same day or next."
        phone="508.579.9897"
        towns={[...SERVICE_AREA_TOWNS]}
      />
      <ContactCTASection
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}
