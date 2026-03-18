import { TResourceStatus } from "./resource-status.types";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  relevance: number;
  status: TResourceStatus;
  categoryId: string;
  subcategoryId: string;
  createdAt: string;
  updatedAt: string;
  archivedAt: string;
  deletedAt: string;
}

export interface IProductWithAll extends IProduct {
  category: any;
  subcategory: any;
  tags: any[]
}