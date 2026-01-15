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
  items: any[];
  config: any | null;
  _count: {
    items: number;
  };
}
