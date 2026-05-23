import { Layers } from "lucide-react";
import { Tile, type TileBlock } from "@/components/site/Tile";

export function ProductImageGallery({ categorySlides }: { categorySlides: TileBlock[] }) {
  return (
    <section aria-labelledby="product-gallery-heading" className="section bg-base text-zinc-900">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="grid gap-5 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
              See the materials
            </p>
            <h2 id="product-gallery-heading" className="display-3 leading-[0.95] text-balance text-zinc-950">
              Browse by look, then confirm by job.
            </h2>
            <p className="body mt-5 max-w-[44ch] text-zinc-700 text-pretty">
              Photos help with color, texture, and finish. The right order still comes down to the project, depth, town, and drop spot.
            </p>
          </div>

          <div className="overflow-hidden rounded-md ring-1 ring-zinc-800">
            <div className="min-h-[420px] md:min-h-[560px]">
              <Tile
                id="products-image-gallery"
                fill
                variant="carousel"
                ariaLabel="Browse material photos by category"
                slides={categorySlides}
                controls="both"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function categoryGallerySlide(slide: TileBlock): TileBlock {
  if (slide.variant !== "image") return slide;
  return {
    ...slide,
    overlay: {
      ...slide.overlay,
      eyebrow: slide.overlay?.eyebrow ?? "Material",
      layout: "anchored",
      anchorIcon: slide.overlay?.anchorIcon ?? <Layers />,
    },
  };
}
