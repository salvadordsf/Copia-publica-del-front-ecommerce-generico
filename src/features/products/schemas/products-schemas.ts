import { BooleanInQuery } from "@/schemas/boolean-schema";
import { StatusEnum } from "@/schemas/enums-schema";
import { sortBySchema, sortOrderSchema } from "@/schemas/sort-order-by-schema";
import { UuidSchema } from "@/schemas/uuid-schema";
import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(3, "El nombre tiene que tener al menos 3 caracteres."),
  description: z
    .string()
    .min(10, "La descripción tiene que tener al menos 10 caracteres."),
  price: z.number().min(0, "El precio tiene que tener un valo mayor a $0."),
  relevance: z
    .number()
    .int()
    .min(1, "La relevancia tiene que ser un valor entre 1 y 6")
    .max(6, "La relevancia tiene que ser un valor entre 1 y 6")
    .optional(),
  stock: z.number().int().min(0, "El stock debe ser positivo"),
  categoryId: UuidSchema,
  subcategoryId: UuidSchema,
  tagsAry: z.array(UuidSchema).optional(),
  status: StatusEnum.optional(),
});
export type ICreateProduct = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();
export type IUpdateProduct = z.infer<typeof UpdateProductSchema>;

export const ReassignProductsSchema = z.object({
  items: z.array(
    z.object({
      productId: UuidSchema,
      categoryId: UuidSchema,
      subcategoryId: UuidSchema,
    })
  ),
});

export type IReassignProducts = {
  productId: string;
  categoryId: string;
  subcategoryId: string;
}[];

export const GetProductsQuerySchema = z
  .object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
    name: z.string().optional(),
    search: z.string().optional(),
    priceMin: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (val !== undefined) {
            const parsed = parseInt(val);
            if (isNaN(parsed)) {
              val = undefined;
              return true;
            }
            if (parsed >= 0 && parsed <= 999999998) return true;
            return false;
          } else return true;
        },
        {
          message: "Fuera de rango",
        }
      ),
    priceMax: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (val !== undefined) {
            const parsed = parseInt(val);
            if (isNaN(parsed)) {
              val = undefined;
              return true;
            }
            if (parsed >= 0 && parsed <= 999999998) return true;
            return false;
          } else return true;
        },
        {
          message: "Fuera de rango",
        }
      ),
    relevance: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (val !== undefined) {
            const parsed = parseInt(val);
            if (isNaN(parsed) || parsed <= 0) {
              val = undefined;
              return true;
            }

            if (parsed > 0 && parsed <= 6) return true;
            return false;
          } else return true;
        },
        {
          message: "Fuera de rango",
        }
      ),
    status: StatusEnum.optional().transform((val) =>
      val === "false" ? undefined : val
    ),
    category: BooleanInQuery.optional(),
    subcategory: BooleanInQuery.optional(),
    tags: BooleanInQuery.optional(),
    tagsAry: z.array(z.string()).optional(),
    categoryId: UuidSchema.optional(),
    subcategoryId: UuidSchema.optional(),
    sortBy: sortBySchema,
    sortOrder: sortOrderSchema,
  })
  .strict();

export type IGetProductsQuery = z.input<typeof GetProductsQuerySchema>;

export const GetProductsFormFilterSchema = GetProductsQuerySchema.omit({
  page: true,
  pageSize: true,
});

export type IGetProductsFormFilter = z.input<
  typeof GetProductsFormFilterSchema
>;

export type IGetProductsQueryFilters = Omit<
  IGetProductsQuery,
  "page" | "pageSize"
>;
