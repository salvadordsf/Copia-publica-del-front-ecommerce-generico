import { ICategory } from "./category-type";
import { IProduct } from "./product-type";
import { TResourceStatus } from "./resource-status.types";

export interface ISubcategory {
  id: string;
  name: string;
  status: TResourceStatus;
  categoryId: string;
  category: ICategory;
  products: IProduct[];
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  deletedAt: string | null;
  _count: { products: number };
}
