import { z } from "zod";

export const ShippingSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("pickup"),
    shippingStreet: z.string(),
    shippingCity: z.string(),
    shippingProvince: z.string(),
    shippingPostal: z.string(),
    shippingCountry: z.string(),
    shippingNotes: z.string().optional(),
  }),
  z.object({
    type: z.literal("delivery"),
    shippingStreet: z.string().min(1, "Calle requerida"),
    shippingCity: z.string().min(1, "Ciudad requerida"),
    shippingProvince: z.string().min(1, "Provincia requerida"),
    shippingPostal: z.string().min(1, "Código postal requerido"),
    shippingCountry: z.string(),
    shippingNotes: z.string().optional(),
  }),
]);

export type IShippingForm = z.infer<typeof ShippingSchema>;