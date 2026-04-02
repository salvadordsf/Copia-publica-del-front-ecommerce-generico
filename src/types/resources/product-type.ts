import { ICategory } from "./category-type";
import { TResourceStatus } from "./resource-status.types";
import { ISubcategory } from "./subcategory-type";
import { ITag } from "./tag-type";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  relevance: number;
  status: TResourceStatus;
  imageUrls: string[];
  categoryId: string;
  subcategoryId: string;
  category: ICategory;
  subcategory: ISubcategory;
  tags: ITag[];
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  deletedAt: string | null;
}