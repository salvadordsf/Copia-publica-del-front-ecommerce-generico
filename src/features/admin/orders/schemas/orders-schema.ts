import { BooleanInQuery } from "@/schemas/boolean-schema";
import { OrderStatusEnum } from "@/schemas/enums-schema";
import {
  sortByOrderSchema,
  sortOrderSchema,
} from "@/schemas/sort-order-by-schema";
import { UuidSchema } from "@/schemas/uuid-schema";
import { z } from "zod";

export const GetOrdersQuerySchema = z
  .object({
    page: z.string().optional(),
    pageSize: z.string().optional(),

    userId:  z.union([UuidSchema, z.literal(""), z.undefined()]),
    search: z.string().optional(),
    status: OrderStatusEnum.optional(),

    products: BooleanInQuery.optional(),

    sortBy: sortByOrderSchema,
    sortOrder: sortOrderSchema,
  })
  .strict();

export type IGetOrderQuery = z.input<typeof GetOrdersQuerySchema>;

export const CreateOrderSchema = z
  .object({
    shippingStreet: z
      .string()
      .trim()
      .min(3, "El nombre de la calle debe tener al menos 3 letras."),
    shippingCity: z
      .string()
      .trim()
      .min(3, "El nombre de la ciudad debe tener al menos 3 letras."),
    shippingProvince: z
      .string()
      .trim()
      .min(3, "El nombre de la provincia debe tener al menos 3 letras."),
    shippingPostal: z
      .string()
      .trim()
      .min(3, "El código postal debe tener al menos 3 caracteres."),
    shippingCountry: z
      .string()
      .trim()
      .min(3, "El nombre del país debe tener al menos 3 letras."),
    shippingNotes: z
      .string()
      .trim()
      .max(300, "Las notas opcionales no pueden tener más de 300 caracteres.")
      .optional(),
  })
  .strict();
export type ICreateOrder = z.output<typeof CreateOrderSchema>;

export const CreateOrderWithUserIdSchema = z
  .object({
    userId: UuidSchema,
    shippingStreet: z
      .string()
      .trim()
      .min(3, "El nombre de la calle debe tener al menos 3 letras."),
    shippingCity: z
      .string()
      .trim()
      .min(3, "El nombre de la ciudad debe tener al menos 3 letras."),
    shippingProvince: z
      .string()
      .trim()
      .min(3, "El nombre de la provincia debe tener al menos 3 letras."),
    shippingPostal: z
      .string()
      .trim()
      .min(3, "El código postal debe tener al menos 3 caracteres."),
    shippingCountry: z
      .string()
      .trim()
      .min(3, "El nombre del país debe tener al menos 3 letras."),
    shippingNotes: z
      .string()
      .trim()
      .max(300, "Las notas opcionales no pueden tener más de 300 caracteres.")
      .optional(),
  })
  .strict();
export type ICreateOrderWithUserId = z.output<
  typeof CreateOrderWithUserIdSchema
>;

export const UpdateOrderSchema = z
  .object({
    status: OrderStatusEnum.optional(),
    shippingStreet: z
      .string()
      .trim()
      .min(3, "El nombre de la calle debe tener al menos 3 letras."),
    shippingCity: z
      .string()
      .trim()
      .min(3, "El nombre de la ciudad debe tener al menos 3 letras."),
    shippingProvince: z
      .string()
      .trim()
      .min(3, "El nombre de la provincia debe tener al menos 3 letras."),
    shippingPostal: z
      .string()
      .trim()
      .min(3, "El código postal debe tener al menos 3 caracteres."),
    shippingCountry: z
      .string()
      .trim()
      .min(3, "El nombre del país debe tener al menos 3 letras."),
    shippingNotes: z
      .string()
      .trim()
      .max(300, "Las notas opcionales no pueden tener más de 300 caracteres.")
      .optional(),
  })
  .strict()
  .partial();
export type IUpdateOrder = z.output<typeof UpdateOrderSchema>;
