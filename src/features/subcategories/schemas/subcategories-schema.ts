import { z } from "zod";

export const GetSubcategoryQuerySchema = z
  .object({
    name: z.string().optional(),
    category: z.boolean().optional(),
    products: z.boolean().optional(),
  })
  .strict();

export type IGetSubcategoryQuery = z.output<typeof GetSubcategoryQuerySchema>;

export const CreateSubcategorySchema = z.object({
  name: z.string().min(3, {
    message: "La subcategoría debe tener al menos 3 caracteres.",
  }),
  categoryId: z.string({ message: "El campo es requerido."}).uuid({ message: "Seleccione una categoría válida." }),
});

export type ICreateSubcategory = z.infer<typeof CreateSubcategorySchema>;

export const UpdateSubcategorySchema = CreateSubcategorySchema.partial();

export type IUpdateSubcategory = z.infer<typeof UpdateSubcategorySchema>;
