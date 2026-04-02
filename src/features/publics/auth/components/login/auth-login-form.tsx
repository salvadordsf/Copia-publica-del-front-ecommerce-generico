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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { LoginSchema } from "../../schemas/auth-schemas";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type LoginValues = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirect =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : "/home";

  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setServerError(null);

    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            router.replace(redirect);
          },
          // Handle BetterAuth errors
          onError: (ctx) => {
            if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
              setServerError("El correo o la contraseña no son válidos.");
            } else {
              setServerError(
                "Ocurrió un error inesperado. Vuelve a intentarlo.",
              );
            }
          },
        },
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
            Inicio de sesión
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Ingresa tu correo y contraseña para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
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
                autoComplete="password"
                {...register("password")}
                className="h-10"
              />

              <p className="text-center text-sm text-gray-600">
                ¿No recuerdas tu contraseña?{" "}
                <span
                  onClick={() => {
                    console.log("Forgot password clicked");
                  }}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Recuperar contraseña
                </span>
              </p>

              <span className="text-red-500 text-xs min-h-[18px]">
                {errors.password?.message}
              </span>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onClick={() => setRememberMe(!rememberMe)}
              />
              <Label htmlFor="remember" className="text-sm">
                Mantener sesión iniciada
              </Label>
            </div>

            {/* Server Error */}
            {serverError && <div className="min-h-[20px] flex justify-center">
              {serverError && (
                <p className="text-red-600 text-sm font-medium text-center">
                  {serverError}
                </p>
              )}
            </div>}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>

            <p className="text-center text-sm text-gray-600">
              ¿Todavía no tenés cuenta?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-semibold hover:underline"
              >
                Crear una cuenta
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
