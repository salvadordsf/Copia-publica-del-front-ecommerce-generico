import { IProduct } from "./product-type";
import { IUser } from "./user-type";

export type OrderStatus =
  | "PENDING"
  | "READY"
  | "PAID"
  | "SHIPPED"
  | "CANCELLED";

export interface IOrderProduct {
  id: string;
  orderId: string;
  productName: string;
  quantity: number;
  subtotal: string;
  unitPrice: string;

  productId: string;
  product: IProduct;
}

export interface IOrder {
  id: string;
  orderNumber: number;
  status: OrderStatus;
  totalAmount: number;

  shippingStreet: string;
  shippingCity: string;
  shippingProvince: string;
  shippingPostal: string;
  shippingCountry: string;
  shippingNotes?: string | null;

  createdAt: string;
  updatedAt: string;

  products: IOrderProduct[];
  user: IUser;
  userId: string;
  _count: {
    products: number;
  };
}
