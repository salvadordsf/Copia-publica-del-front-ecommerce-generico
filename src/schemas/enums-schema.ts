import { z } from "zod";

export const StatusEnum = z.enum(["false", "ACTIVE", "ARCHIVED", "DELETED"], { message: "Status must be ACTIVE, ARCHIVED or DELETED" });
export type IStatusEnum = z.infer<typeof StatusEnum>;

export const RoleEnum = z.enum(["USER", "EDITOR","ADMIN"]);
export type IRole = ["USER", "EDITOR", "ADMIN"];

export const OrderStatusEnum = z.enum(["PENDING", "READY", "PAID", "SHIPPED", "CANCELLED"]);