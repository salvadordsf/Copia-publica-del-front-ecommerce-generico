import { CreatedUpdatedAtSchema } from "@/schemas/created-updated-at-schema";
import { RoleSchema } from "@/schemas/role-schema";
import { z } from "zod";

export const UserLocalStorageSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(6),
  email: z.string().email(),
  role: RoleSchema,
  createdAt: CreatedUpdatedAtSchema,
  updatedAt: CreatedUpdatedAtSchema,
});

export type UserLocalStorageType = z.infer<typeof UserLocalStorageSchema>

const AUTH_ERRORS = {
  NAME_MIN: "El nombre de usuario debe tener 6 caracteres min.",
  NAME_MAX: "El nombre de usuario debe tener 30 caracteres max.",
  EMAIL: "Ingresar un mail válido",
  PASSWORD_MIN: "La contraseña debe tener 8 caracteres min.",
  CONFIRM: "Las contraseñas no coinciden.",
};

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(6, { message: AUTH_ERRORS.NAME_MIN })
      .max(30, { message: AUTH_ERRORS.NAME_MAX }),
    email: z.string().email({ message: AUTH_ERRORS.EMAIL }),
    password: z.string().min(8, { message: AUTH_ERRORS.PASSWORD_MIN }),
    confirm: z.string().min(8, { message: AUTH_ERRORS.PASSWORD_MIN }),
  })
  .refine(
    (data) => {
      if (data.password === data.confirm) return true;
      return false;
    },
    { message: AUTH_ERRORS.CONFIRM, path: ["confirm"] }
  );

export const LoginSchema = z.object({
  email: z.string().email({ message: AUTH_ERRORS.EMAIL }),
  password: z.string().min(8, { message: AUTH_ERRORS.PASSWORD_MIN }),
});

export type IRegister = z.infer<typeof RegisterSchema>;
export type ILogin = z.infer<typeof LoginSchema>;
