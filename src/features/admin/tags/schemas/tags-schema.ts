import { StatusEnum } from "@/schemas/enums-schema";
import { z } from "zod";

const MIN_LENGHT = 3;

export const CreateTagSchema = z.object({
  name: z.string().min(MIN_LENGHT, { message: `La tag debe tener al menos ${MIN_LENGHT} letras.`}),
});

export type ICreateTagSchema = z.infer<typeof CreateTagSchema>;

export const UpdateTagSchema = z.object({
  name: z.string().min(MIN_LENGHT, { message: `La tag debe tener al menos ${MIN_LENGHT} letras.`}).optional(),
});

export type IUpdateTag = z.infer<typeof UpdateTagSchema>;

export const GetTagQuerySchema = z.object({
    name: z.string().optional(),
    products: z.boolean().optional(),
    status: StatusEnum.optional(),
});

export type IGetTagQuery = z.infer<typeof GetTagQuerySchema>;

export const FilterBulkTagsQuerySchema = z
  .object({
    name: z.string().optional(),
    status: StatusEnum.optional().transform((val) =>
      val === "false" ? undefined : val
    ),
  })
  .strict();

export type IFilterBulkTagsQuery = z.input<typeof FilterBulkTagsQuerySchema>;

export const UpdateBulkTagsSchema = z
  .object({
    status: StatusEnum.optional(),
  })
  .strict();

export type IUpdateBulkTags = z.output<typeof UpdateBulkTagsSchema>;