import { TResourceStatus } from "./resource-status.types";

export interface IGeneralResources {
  id: string;
  name: string;
  status: TResourceStatus;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  deletedAt: string | null;
}
