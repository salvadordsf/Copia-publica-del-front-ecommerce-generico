import { UuidSchema } from "@/schemas/uuid-schema";
import { z } from "zod";

export const CreateOrderProduct = z
  .object({
    productId: UuidSchema,
    orderId: UuidSchema,
    quantity: z.number().positive(),
  })
  .strict();

export type ICreateOrderProduct = z.input<typeof CreateOrderProduct>;

