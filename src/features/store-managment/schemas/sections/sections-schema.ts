import { z } from "zod";

const SectionType = {
  ANNOUNCEMENT_CAROUSEL: "ANNOUNCEMENT_CAROUSEL",
  BANNER: "BANNER",
  PRODUCT_CAROUSEL: "PRODUCT_CAROUSEL",
  CATEGORY_CAROUSEL: "CATEGORY_CAROUSEL",
  GRID: "GRID",
  TEXT: "TEXT",
  CUSTOM: "CUSTOM",
} as const;

export const GetSectionSchema = z
  .object({
    type: z.nativeEnum(SectionType).optional(),
    isEnabled: z
      .preprocess(
        (val) =>
          val === "true" || val === true
            ? true
            : val === "false" || val === false
            ? false
            : undefined,
        z.boolean({ message: "El valor solo puede ser verdadero o falso" })
      )
      .optional(),
    key: z.string().trim().optional(),
  })
  .strict();

export type IGetSection = z.infer<typeof GetSectionSchema>;

export const CreateSectionSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "El título debe tener mínimo 1 caracter")
      .max(120, "El título no puede tener más de 120 caracteres")
      .optional(),
    type: z.nativeEnum(SectionType, {
      required_error: "El tipo es requerido",
    }),
    position: z
      .number({
        required_error: "La posición es requerida",
      })
      .int()
      .min(0, "La posición debe ser un entero mayor a 0"),
    isEnabled: z.boolean().optional(),
    config: z.unknown().optional(),
  })
  .strict();

export type ICreateSection = z.infer<typeof CreateSectionSchema>;

export const UpdateSectionSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "El título debe tener mínimo 1 caracter")
      .max(120, "El título no puede tener más de 120 caracteres")
      .optional(),
    type: z.nativeEnum(SectionType).optional(),
    position: z
      .number()
      .int()
      .min(0, "La posición debe ser un entero mayor a 0")
      .optional(),
    isEnabled: z.boolean().optional(),
    config: z.unknown().optional(),
  })
  .strict();

export type IUpdateSection = z.infer<typeof UpdateSectionSchema>;
