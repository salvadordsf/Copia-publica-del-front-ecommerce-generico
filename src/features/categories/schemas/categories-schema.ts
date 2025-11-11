import { StatusEnum } from "@/schemas/enums-schema";
import { z } from "zod";

export const GetCategoryQuerySchema = z
  .object({
    name: z.string().optional(),
    status: StatusEnum.optional(),
    subcategories: z.boolean().optional(),
    products: z.boolean().optional(),
  })
  .strict();

export type IGetCategoryQuery = z.output<typeof GetCategoryQuerySchema>;

export const CreateCategorySchema = z.object({
  name: z.string().min(3, {
    message: "La categoría debe tener al menos 3 caracteres.",
  }),
});
export type ICreateCategory = z.output<typeof CreateCategorySchema>;

export const UpdateCategorySchema = CreateCategorySchema.partial();

export type IUpdateCategory = z.output<typeof UpdateCategorySchema>;

export const FilterBulkCategoryQuerySchema = z
  .object({
    name: z.string().optional(),
    status: StatusEnum.optional().transform((val) =>
      val === "false" ? undefined : val
    ),
  })
  .strict();

export type IFilterBulkCategoryQuery = z.output<typeof FilterBulkCategoryQuerySchema>;

export const UpdateBulkCategoriesSchema = z
  .object({
    status: StatusEnum.optional(),
  })
  .strict();

export type IUpdateBulkCategories = z.output<typeof UpdateBulkCategoriesSchema>;