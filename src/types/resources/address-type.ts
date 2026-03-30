import { IUser } from "./user-type";

export interface IAddress {
  id: string;
  userId: string;
  user: IUser;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}
