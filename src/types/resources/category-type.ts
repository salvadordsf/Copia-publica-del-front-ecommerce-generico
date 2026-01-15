import { ItemSectionType } from "./home-section-types";
import { IProduct } from "./product-type";
import { TResourceStatus } from "./resource-status.types";
import { ISubcategory } from "./subcategory-type";

export interface ICategory {
  id: string;
  name: string;
  products: IProduct[]
  subcategories: ISubcategory[];
  status: TResourceStatus;
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  deletedAt: string;
  homeSectionItems: ItemSectionType[]
}