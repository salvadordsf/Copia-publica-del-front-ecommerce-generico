import { StatusEnum } from "@/schemas/enums-schema";
import { z } from "zod";

const MIN_LENGHT = 3;

export const CreateTagSchema = z.object({
  name: z.string().min(MIN_LENGHT, { message: `La tag debe tener al menos ${MIN_LENGHT} letras.`}),
});

export type ICreateTagSchema = z.infer<typeof CreateTagSchema>;

export const GetTagQuerySchema = z.object({
    name: z.string().optional(),
    products: z.boolean().optional(),
    status: StatusEnum.optional(),
});

export type IGetTagQuery = z.infer<typeof GetTagQuerySchema>;