import { UuidSchema } from "@/schemas/uuid-schema";
import { z } from "zod";

const ItemType = {
  ANNOUNCEMENT: "ANNOUNCEMENT",
  IMAGE: "IMAGE",
  LINK: "LINK",
  PRODUCT: "PRODUCT",
  CATEGORY: "CATEGORY",
  TEXT: "TEXT",
  MIXED: "MIXED",
} as const;

export const GetItemSchema = z
  .object({
    sectionId: UuidSchema.optional(),
    itemType: z.nativeEnum(ItemType).optional(),
    productId: UuidSchema.optional(),
    categoryId: UuidSchema.optional(),
  })
  .strict();

export type IGetItem = z.output<typeof GetItemSchema>;

export const CreateItemSchema = z
  .object({
    sectionId: UuidSchema,
    itemType: z.nativeEnum(ItemType, {
      required_error: "El tipo es requerido",
    }),

    productId: UuidSchema.optional(),
    categoryId: UuidSchema.optional(),
    imageUrl: z.string().url("URL inválida").optional(),
    linkUrl: z.string().url("URL inválida").optional(),

    title: z
      .string()
      .trim()
      .max(120, "El título debe tener como máximo 120 caracteres")
      .optional(),
    subtitle: z
      .string()
      .trim()
      .max(200, "El subtítulo debe tener como máximo 120 caracteres")
      .optional(),

    position: z
      .number({
        required_error: "La posición es requerida",
      })
      .int()
      .min(0, "La posición debe ser un entero mayor a 0"),
  })
  .strict()
  .superRefine((data, ctx) => {
    // 1) At least one of the content fields must be provided
    const contentFields = [
      data.productId,
      data.categoryId,
      data.imageUrl,
      data.linkUrl,
    ];

    if (!contentFields.some((f) => typeof f === "string" && f.length > 0)) {
      ctx.addIssue({
        code: "custom",
        message:
          "Al menos uno de los siguientes es requerido: producto, categoría, url imagen, url link.",
        path: ["productId"],
      });
    }

    // 2) Dynamic validation depending on itemType
    switch (data.itemType) {
      case ItemType.PRODUCT:
        if (!data.productId) {
          ctx.addIssue({
            code: "custom",
            message: "Producto es requerido",
            path: ["productId"],
          });
        }
        break;

      case ItemType.CATEGORY:
        if (!data.categoryId) {
          ctx.addIssue({
            code: "custom",
            message: "Categoría es requerida",
            path: ["categoryId"],
          });
        }
        break;

      case ItemType.IMAGE:
        if (!data.imageUrl) {
          ctx.addIssue({
            code: "custom",
            message: "URL imagen es requerida",
            path: ["imageUrl"],
          });
        }
        break;

      case ItemType.LINK:
        if (!data.linkUrl) {
          ctx.addIssue({
            code: "custom",
            message: "URL link es requerida",
            path: ["linkUrl"],
          });
        }
        break;
    }
  });

export type ICreateItem = z.output<typeof CreateItemSchema>;

export const UpdateItemSchema = z
  .object({
    title: z
      .string()
      .trim()
      .max(120, "El título debe tener como máximo 120 caracteres")
      .optional(),
    subtitle: z
      .string()
      .trim()
      .max(200, "El subtítulo debe tener como máximo 120 caracteres")
      .optional(),

    position: z
      .number({
        required_error: "La posición es requerida",
      })
      .int()
      .min(0, "La posición debe ser un entero mayor a 0"),
  })
  .strict();

export type IUpdateItem = z.output<typeof UpdateItemSchema>;

//Specific items

//ANNOUNCEMENT
export const CreateAnnouncementItemSchema = z.object({
  sectionId: UuidSchema,
  itemType: z.literal(ItemType.ANNOUNCEMENT),
  title: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(120, "Máximo 120 caracteres"),
  subtitle: z.string().trim().max(200, "Máximo 200 caracteres").optional(),
  linkUrl: z.string({ message: "El link es requerido" }).url("URL inválida"),
  position: z
    .number({
      required_error: "La posición es requerida",
    })
    .int()
    .min(1, "La posición debe ser mayor o igual a 1"),
});
export type ICreateAnnouncementItem = z.infer<
  typeof CreateAnnouncementItemSchema
>;

//IMAGE
export const CreateImageItemSchema = z.object({
  sectionId: UuidSchema,
  itemType: z.literal(ItemType.IMAGE),
  title: z.string().trim().max(120, "Máximo 120 caracteres").optional(),
  subtitle: z.string().trim().max(200, "Máximo 200 caracteres").optional(),
  imageUrl: z
    .string({ message: "La URL de imagen es requerida" })
    .url("URL inválida"),
  linkUrl: z.string().url("URL inválida").optional(),
  position: z
    .number({
      required_error: "La posición es requerida",
    })
    .int()
    .min(1, "La posición debe ser mayor o igual a 1"),
});
export type ICreateImageItem = z.infer<typeof CreateImageItemSchema>;

//CATEGORY
export const SelectCategoriesSchema = z.object({
  categoryIds: z
    .array(z.string().uuid())
    .min(1, "Seleccioná al menos una categoría"),
});

export type SelectCategoriesFormValues = z.infer<typeof SelectCategoriesSchema>;

//TEXT
export const CreateTextItemSchema = z.object({
  sectionId: UuidSchema,
  itemType: z.literal(ItemType.TEXT),
  title: z
    .string()
    .trim()
    .min(1, "El texto es obligatorio")
    .max(120, "Máximo 120 caracteres"),
  subtitle: z.string().trim().max(200, "Máximo 200 caracteres").optional(),
  linkUrl: z.string({ message: "El link es requerido" }).url("URL inválida"),
  position: z
    .number({
      required_error: "La posición es requerida",
    })
    .int()
    .min(1, "La posición debe ser mayor o igual a 1"),
});
export type ICreateTextItem = z.infer<typeof CreateTextItemSchema>;

//LINK
export const CreateLinkItemSchema = z.object({
  sectionId: UuidSchema,
  itemType: z.literal(ItemType.LINK),
  title: z
    .string()
    .trim()
    .min(1, "El texto es obligatorio")
    .max(120, "Máximo 120 caracteres"),
  subtitle: z.string().trim().max(200, "Máximo 200 caracteres").optional(),
  linkUrl: z.string({ message: "El link es requerido" }).url("URL inválida"),
  position: z
    .number({
      required_error: "La posición es requerida",
    })
    .int()
    .min(1, "La posición debe ser mayor o igual a 1"),
});
export type ICreateLinkItem = z.infer<typeof CreateLinkItemSchema>;
