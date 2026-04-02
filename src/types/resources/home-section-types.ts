import { ICategory } from "./category-type";
import { IProduct } from "./product-type";

export type SectionType =
  | "ANNOUNCEMENT_CAROUSEL"
  | "PRODUCT_CAROUSEL"
  | "CATEGORY_CAROUSEL"
  | "BANNER"
  | "TEXT"
  | "GRID"
  | "CUSTOM";

export interface HomeSection {
  id: string;
  type: SectionType;
  position: number;
  title: string | null;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  items: ItemSection[];
  config: unknown | null;
  _count: {
    items: number;
  };
}

export type ItemSectionType =
  | "ANNOUNCEMENT"
  | "PRODUCT"
  | "CATEGORY"
  | "IMAGE"
  | "TEXT"
  | "LINK"
  | "MIXED";

export interface ItemSection {
  id: string;
  sectionId: string;
  section: HomeSection;
  position: number;
  itemType: ItemSectionType;
  productId: string | null;
  product: IProduct;
  categoryId: string | null;
  category: ICategory;
  title: string | null;
  subtitle: string | null;
  linkUrl: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
