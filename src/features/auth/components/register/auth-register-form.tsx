"use client";

import { useForm } from "react-hook-form";
import { IRegister, RegisterSchema } from "../../schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/dashboard/form/form-error-input";
import { useRegister } from "../../services/auth-mutations";
import { FormServerError } from "@/components/dashboard/form/form-error-server";
import { AxiosError } from "axios";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = (data: IRegister) => {
    console.log(data);
    registerMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* USER NAME */}
      <label htmlFor="register-form-name">
        <span>Nombre de usuario</span>
        <input
          {...register("name")}
          type="text"
          autoComplete="username"
          name="name"
          id="register-form-name"
        />
        <FormError error={errors.name} />
      </label>

      {/* EMAIL */}
      <label htmlFor="register-form-email">
        <span>Correo electrónico</span>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          name="email"
          id="register-form-email"
        />
        <FormError error={errors.email} />
        {registerMutation.isError &&
          (registerMutation.error as AxiosError).response?.status && (
            <FormServerError
              status={(registerMutation.error as AxiosError).response?.status}
              context="register"
            />
          )}
      </label>

      {/* PASSWORD */}
      <label htmlFor="register-form-password">
        <span>Contraseña</span>
        <input
          {...register("password")}
          type="password"
          autoComplete="new-password"
          name="password"
          id="register-form-password"
        />
        <FormError error={errors.password} />
      </label>

      {/* CONFIRM */}
      <label htmlFor="register-form-confirm">
        <span>Confirmar contraseña</span>
        <input
          {...register("confirm")}
          type="password"
          name="confirm"
          id="register-form-confirm"
        />
        <FormError error={errors.confirm} />
      </label>

      {/* SUBMIT */}
      <button type="submit" disabled={registerMutation.isPending}>
        Registrarse
      </button>

      {registerMutation.isSuccess && (
        <p className="text-green-600">¡Registro exitoso! Redirigiendo...</p>
      )}
    </form>
  );
}
