import { authClient } from "@/lib/auth-client";
import { TResourceStatus } from "./resource-status.types";
import { IOrder } from "./order-types";
import { IAddress } from "./address-type";

export type TUsersRoles = "USER" | "EDITOR" | "ADMIN";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: TUsersRoles;
  address: IAddress[];
  orders: IOrder[];

  status: TResourceStatus;

  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  deletedAt: string | null;
  emailVerified: boolean;
  image: string | null;
}

type User = typeof authClient.$Infer.Session.user;

export type ExtendedSessionUserType = User & {
  role: TUsersRoles;
};
