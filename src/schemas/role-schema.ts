import { z } from "zod";

export const RoleSchema = z.enum(["USER", "EDITOR", "ADMIN"])

export type IRole = ["USER", "EDITOR", "ADMIN"];
