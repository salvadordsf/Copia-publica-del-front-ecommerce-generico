"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm({
  title = "Contacta con nosotros",
}: {
  title?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Future feature:", data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Nombre completo"
              {...register("name", { required: true })}
            />

            <Input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", { required: true })}
            />

            <Textarea
              placeholder="Tu mensaje o pregunta..."
              rows={4}
              {...register("message", { required: true })}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
