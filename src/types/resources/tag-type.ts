import { IProduct } from "./product-type";
import { TResourceStatus } from "./resource-status.types";

export interface ITag {
  id: string;
  name: string;
  slug: string;
  status: TResourceStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  archivedAt: string | null;
  products: IProduct[];
  _count: {
    products: number;
  };
}

export interface IToggleCreateTag {
  tag: ITag;
  prev_status: "NON_EXISTENT" | TResourceStatus;
}
