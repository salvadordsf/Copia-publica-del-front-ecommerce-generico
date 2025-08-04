import { z } from "zod";

export const GetCategoryQuerySchema = z
  .object({
    name: z.string().optional(),
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
