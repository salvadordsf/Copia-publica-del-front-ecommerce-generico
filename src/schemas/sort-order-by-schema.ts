import { z } from "zod";

export const sortBySchema = z
  .enum(["name", "price", "relevance", "createdAt", "updatedAt"])
  .optional();
export const sortByUserSchema = z
  .enum(["name", "email", "role", "createdAt", "updatedAt"])
  .optional();
export const sortByOrderSchema = z
  .enum(["user", "totalAmount", "createdAt", "updatedAt"])
  .optional();

export const sortOrderSchema = z.enum(["asc", "desc"]).optional();