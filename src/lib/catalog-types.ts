export type Category = "mulch" | "stone" | "additional";

export interface ProductDTO {
  id: string;
  category: Category;
  name: string;
  description: string;
  priceCents: number;
  unit: string;
  imageKey: string | null;
  sortOrder: number;
}

export interface DeliveryZoneDTO {
  id: string;
  town: string;
  feeCents: number;
  sortOrder: number;
}

export interface CatalogDTO {
  mulch: ProductDTO[];
  stone: ProductDTO[];
  additional: ProductDTO[];
}