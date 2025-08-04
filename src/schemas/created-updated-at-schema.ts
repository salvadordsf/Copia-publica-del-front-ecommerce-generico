import { z } from "zod";

export const CreatedUpdatedAtSchema = z.date();

export type CreatedUpdatedAt = Date;