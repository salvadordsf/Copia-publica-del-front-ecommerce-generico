"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/dashboard/form/form-error-input";
import { FormServerError } from "@/components/dashboard/form/form-error-server";
import { AxiosError } from "axios";
import { ILogin, LoginSchema } from "../../schemas/auth-schemas";
import { useLogin } from "../../services/auth-mutations";

export default function LoginForm() {
  const {
	register,
	handleSubmit,
	formState: { errors },
  } = useForm<ILogin>({
	resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = (data: ILogin) => {
	console.log(data);
	loginMutation.mutate(data);
  };

  return (
	<form onSubmit={handleSubmit(onSubmit)}>

	  {/* EMAIL */}
	  <label htmlFor="login-form-email">
		<span>Correo electrónico</span>
		<input
		  {...register("email")}
		  type="email"
		  autoComplete="email"
		  name="email"
		  id="login-form-email"
		/>
		<FormError error={errors.email} />
		{loginMutation.isError &&
		  (loginMutation.error as AxiosError).response?.status && (
			<FormServerError
			  status={(loginMutation.error as AxiosError).response?.status}
			  context="login"
			/>
		  )}
	  </label>

	  {/* PASSWORD */}
	  <label htmlFor="login-form-password">
		<span>Contraseña</span>
		<input
		  {...register("password")}
		  type="password"
		  autoComplete="new-password"
		  name="password"
		  id="login-form-password"
		/>
		<FormError error={errors.password} />
	  </label>

	  {/* SUBMIT */}
	  <button type="submit" disabled={loginMutation.isPending}>
		Iniciar sesión
	  </button>

	  {loginMutation.isSuccess && (
		<p className="text-green-600">¡Inicio exitoso! Redirigiendo...</p>
	  )}
	</form>
  );
}
