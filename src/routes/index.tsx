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
} from "@/assets/photos";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulch, Loam, Sand & Stone — Jefferson, MA" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand & stone from Buy The Yard in Jefferson, MA. Woman-owned, WBE-certified, and built for pickup or delivery across Central Mass.",
      },
      { property: "og:title", content: "Buy The Yard — Bulk Landscape Materials in Jefferson, MA" },
      {
        property: "og:description",
        content:
          "Mulch, loam, sand, stone, garden center materials, and practical ordering help from Abby's Jefferson yard.",
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
        meta="EST. 2016 — JEFFERSON, MA"
        heading={<>Mulch. Loam.<br/>Stone. Sand.</>}
        body="Premium mulch, loam, stone, and sand. Woman-owned and operated. Serving Central Massachusetts with precision delivery."
        ctaLabel="Shop Mulch"
        ctaTo="/mulch"
        image={dumpTruckDeliveringDarkMulch}
        imageAlt="Buy The Yard truck delivering fresh dark mulch"
      />
      <MaterialInventorySection
        items={[
          { code: "CAT_01", name: "Mulch", description: "Double-ground, color-locked mulch. Moisture retention and weed suppression.", unit: "CUBIC YARD", to: "/mulch", icon: "mulch" },
          { code: "CAT_02", name: "Stone", description: "Decorative and structural aggregates. Three sizes, multiple colors.", unit: "TON / CY", to: "/stone", icon: "stone" },
          { code: "CAT_03", name: "Additional", description: "Loam, sand, stone dust, salt, compost — the supporting cast.", unit: "CUBIC YARD", to: "/additional", icon: "additional" },
          { code: "CAT_04", name: "Garden Center", description: "Annuals, perennials, hanging baskets, mums, tools, and hardware.", unit: "AT THE YARD", to: "/garden-center", icon: "garden-center" },
        ]}
      />
      <OwnerStorySection
        heading={<>WBE Certified<br/>Woman-Owned</>}
        body="Founded by Abby in 2016, Buy The Yard is a certified Woman Business Enterprise by the Commonwealth of Massachusetts. We bring a professional, customer-first approach to a heavy industry."
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
          { quote: "The best mulch in Central Mass. Clean, consistent, and delivered exactly where I needed it.", attribution: "MARK S. / RESIDENTIAL" },
          { quote: "Reliable logistics for our commercial landscape crews. They understand the urgency of site work.", attribution: "GREEN LANDSCAPE INC." },
        ]}
      />
      <ServiceAreaSection
        heading={<>Central Mass<br/>Delivery.</>}
        body="Based in Jefferson, MA. Serving the towns within ~40 minutes of the yard with same-day or next-day delivery."
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
