"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuyerSchema, IBuyer } from "./schemas/buyer-schema";
import { Spinner } from "@/components/ui/spinner";

interface BuyerFormProps {
  onNextAction: (data: IBuyer) => void;
  onBackAction: () => void;
  isLoadingOrder?: boolean;
  isLoadingOrderProduct?: boolean;
}

export default function BuyerForm({
  onNextAction,
  onBackAction,
  isLoadingOrder = false,
  isLoadingOrderProduct = false,
}: BuyerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<IBuyer>({
    resolver: zodResolver(BuyerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: IBuyer) => {
    onNextAction(data);
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
        <Button type="button" variant="outline" onClick={onBackAction}>
          Volver
        </Button>

        <Button
          type="submit"
          className="flex-1"
          disabled={
            !isValid || isSubmitting || isLoadingOrder || isLoadingOrderProduct
          }
        >
          {!isValid ||
          isSubmitting ||
          isLoadingOrder ||
          isLoadingOrderProduct ? (
            <Spinner />
          ) : (
            "Finalizar pedido"
          )}
        </Button>
      </div>
    </form>
  );
}
