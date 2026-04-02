import { BooleanInQuery } from "@/schemas/boolean-schema";
import { RoleEnum, StatusEnum } from "@/schemas/enums-schema";
import { sortByUserSchema, sortOrderSchema } from "@/schemas/sort-order-by-schema";
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: RoleEnum.optional(),
  status: StatusEnum.optional(),
});

export const UpdateUserSchema = CreateUserSchema.extend({
  archivedAt: z.date().optional(),
  deletedAt: z.date().optional(),
}).partial();

export const GetUserQuerySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  search: z.string().optional(),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: RoleEnum.optional(),
  status: StatusEnum.optional(),
  
  getRole: BooleanInQuery.optional(),
  getAddress: BooleanInQuery.optional(),
  getOrders: BooleanInQuery.optional(),

  sortBy: sortByUserSchema,
  sortOrder: sortOrderSchema,
});

export type ICreateUser = z.infer<typeof CreateUserSchema>;
export type IUpdateUser = z.infer<typeof UpdateUserSchema>;
export type IGetUserQuery = z.infer<typeof GetUserQuerySchema>;