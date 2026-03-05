"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const buyerSchema = z.object({
  name: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),

  dni: z
    .string()
    .min(7, "El DNI debe tener al menos 7 caracteres")
    .max(9, "El DNI no puede superar los 9 caracteres"),

  phone: z.string().min(6, "El teléfono debe tener al menos 6 caracteres"),

  email: z.string().email("Ingresá un email válido"),
});
type BuyerFormValues = z.infer<typeof buyerSchema>;

interface BuyerFormProps {
  onNext: (data: BuyerFormValues) => void;
  onBack: () => void;
}

export default function BuyerForm({ onNext, onBack }: BuyerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BuyerFormValues>({
    resolver: zodResolver(buyerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: BuyerFormValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* title */}
      <div className="space-y-1">
        <h3 className="font-medium">Datos del comprador</h3>

        <p className="text-sm text-muted-foreground">
          Estos datos deben corresponder a la persona que realiza la compra o
          que efectuará el pago.
        </p>
      </div>

      {/* inputs */}
      <div className="space-y-2">
        <div>
          <Input
            placeholder="Nombre y apellido del comprador"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input placeholder="DNI del comprador" {...register("dni")} />
          {errors.dni && (
            <p className="text-xs text-red-500 mt-1">{errors.dni.message}</p>
          )}
        </div>

        <div>
          <Input placeholder="Teléfono de contacto" {...register("phone")} />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Input placeholder="Email de contacto" {...register("email")} />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* actions */}
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Volver
        </Button>

        <Button type="submit" className="flex-1" disabled={!isValid}>
          Finalizar pedido
        </Button>
      </div>
    </form>
  );
}
