"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IShippingForm, ShippingSchema } from "./schemas/shipping-info-schema";

export default function ShippingForm({
  onNextAction,
}: {
  onNextAction: (data: IShippingForm) => void;
}) {
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IShippingForm>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: {
      type: undefined,
      shippingStreet: "",
      shippingCity: "",
      shippingProvince: "",
      shippingPostal: "",
      shippingCountry: "Argentina",
      shippingNotes: "",
    },
  });

  const type = watch("type");

  const canCalculateShipping = watch("shippingPostal")?.length > 0;

  const calculateShipping = () => {
    setShippingCost(3000);
  };

  const onSubmit = (data: IShippingForm) => {
  if (data.type === "pickup") {
    onNextAction({
      ...data,
      shippingStreet: "[calle y dirección de la tienda]",
      shippingCity: "[ciudad de la tienda]",
      shippingProvince: "[provincia de la tienda]",
      shippingPostal: "[código postal]",
      shippingCountry: "Argentina",
      shippingNotes: "Retiro en local - Horario: [horario]",
    });
  } else {
    onNextAction(data);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="font-medium">Envío</h3>

      {/* type */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={type === "pickup" ? "default" : "outline"}
          onClick={() => setValue("type", "pickup")}
        >
          Retirar en local
        </Button>

        <Button
          type="button"
          variant={type === "delivery" ? "default" : "outline"}
          onClick={() => setValue("type", "delivery")}
        >
          Envío a domicilio
        </Button>
      </div>

      {!type && (
        <p className="text-xs text-muted-foreground">
          Debés elegir un tipo de envío
        </p>
      )}

      {/* delivery */}
      {type === "delivery" && (
        <div className="space-y-2">
          <Input placeholder="Calle" {...register("shippingStreet")} />
          {errors.shippingStreet && <p>{errors.shippingStreet.message}</p>}

          <Input placeholder="Ciudad" {...register("shippingCity")} />
          {errors.shippingCity && <p>{errors.shippingCity.message}</p>}

          <Input placeholder="Provincia" {...register("shippingProvince")} />
          {errors.shippingProvince && <p>{errors.shippingProvince.message}</p>}

          <Input placeholder="Código postal" {...register("shippingPostal")} />
          {errors.shippingPostal && <p>{errors.shippingPostal.message}</p>}

          {/* shipping calc */}
          <Button
            type="button"
            disabled={!canCalculateShipping}
            onClick={calculateShipping}
          >
            Calcular envío
          </Button>

          {shippingCost && <p>Costo: ${shippingCost}</p>}
        </div>
      )}

      <Button type="submit" disabled={!type}>
        Continuar
      </Button>
    </form>
  );
}
