import { TResourceStatus } from "./resource-status.types";

export type TUsersRoles = "USER" | "EDITOR" | "ADMIN";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: TUsersRoles;
  address: any;
  orders: any;

  status: TResourceStatus;

  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  deletedAt: string | null;
  emailVerified: boolean;
  image: string;
  sessions: any;
  accounts: any;
}
