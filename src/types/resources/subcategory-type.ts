import { ICategory } from "./category-type";
import { IProduct } from "./product-type";
import { TResourceStatus } from "./resource-status.types";

export interface ISubcategory {
  id: string;
  name: string;
  subcategories: any;
  status: TResourceStatus;
  categoryId: string;
  category: ICategory[];
  products: IProduct[];
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  deletedAt: string;
}
