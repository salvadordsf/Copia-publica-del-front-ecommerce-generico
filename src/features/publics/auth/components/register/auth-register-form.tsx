"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { RegisterSchema } from "../../schemas/auth-schemas";

type RegisterValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [serverError, setServerError] = useState<React.ReactNode>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    setServerError(null);

    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onError: (ctx) => {
            if (ctx.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
              setServerError(
                <>
                  <span>Este correo ya está registrado. </span>
                  <Link
                    href="/auth/login"
                    className="underline text-primary font-semibold"
                  >
                    Iniciá sesión
                  </Link>
                </>
              );
            } else {
              setServerError(
                "Ocurrió un error inesperado. Vuelve a intentarlo."
              );
            }
          },
        }
      );
    } catch {
      setServerError("Error inesperado en el servidor.");
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl md:text-2xl font-semibold">
            Crear una cuenta
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Completá tus datos para registrarte.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            {/* Name */}
            <div className="grid gap-1.5">
              <Label htmlFor="name" className="text-sm font-semibold">
                Nombre
              </Label>

              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                {...register("name")}
                className="h-10"
              />

              <span className="text-red-500 text-xs min-h-[18px]">
                {errors.name?.message}
              </span>
            </div>

            {/* Email */}
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-sm font-semibold">
                Correo electrónico
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                {...register("email")}
                className="h-10"
              />

              <span className="text-red-500 text-xs min-h-[18px]">
                {errors.email?.message}
              </span>
            </div>

            {/* Password */}
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-sm font-semibold">
                Contraseña
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                {...register("password")}
                className="h-10"
              />

              <span className="text-red-500 text-xs min-h-[18px]">
                {errors.password?.message}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="grid gap-1.5">
              <Label htmlFor="confirm" className="text-sm font-semibold">
                Confirmar contraseña
              </Label>

              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                {...register("confirm")}
                className="h-10"
              />

              <span className="text-red-500 text-xs min-h-[18px]">
                {errors.confirm?.message}
              </span>
            </div>

            {/* Server Error */}
            <div className="min-h-[20px] flex justify-center">
              {serverError && (
                <p className="text-red-600 text-sm font-medium text-center">
                  {serverError}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Registrarme"
              )}
            </Button>

            {/* Link to Login */}
            <p className="text-center text-sm text-gray-600">
              ¿Ya tenés cuenta?{" "}
              <Link
                href="/auth/login"
                className="text-primary font-semibold hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
