import z from "zod";

export const BuyerSchema = z.object({
  name: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  dni: z
    .string()
    .min(7, "El DNI debe tener al menos 7 caracteres")
    .max(9, "El DNI no puede superar los 9 caracteres"),
  phone: z.string().min(6, "El teléfono debe tener al menos 6 caracteres"),
  email: z.string().email("Ingresá un email válido"),
});
export type IBuyer = z.infer<typeof BuyerSchema>;
