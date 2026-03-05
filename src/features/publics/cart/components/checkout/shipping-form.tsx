"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ShippingForm({ onNext }: any) {
  const [type, setType] = useState<"pickup" | "delivery" | null>(null);
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const [form, setForm] = useState({
    shippingStreet: "",
    shippingCity: "",
    shippingProvince: "",
    shippingPostal: "",
    shippingCountry: "Argentina",
    shippingNotes: "",
  });

  const isDeliveryFormValid =
    form.shippingStreet &&
    form.shippingCity &&
    form.shippingProvince &&
    form.shippingPostal;

  const canCalculateShipping = form.shippingPostal.length > 0;

  const canContinue =
    type === "pickup" ||
    (type === "delivery" && isDeliveryFormValid && shippingCost !== null);

  const calculateShipping = () => {
    // placeholder future logic probably something like that

    //   const cost = await shippingService.calculate({
    //   postalCode: form.shippingPostal,
    // });
    setShippingCost(3000);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Envío</h3>

      <p className="text-sm text-muted-foreground">
        Elegí cómo querés recibir tu pedido.
      </p>

      {/* shipping type */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={type === "pickup" ? "default" : "outline"}
          onClick={() => setType("pickup")}
        >
          Retirar en local
        </Button>

        <Button
          type="button"
          variant={type === "delivery" ? "default" : "outline"}
          onClick={() => setType("delivery")}
        >
          Envío a domicilio
        </Button>
      </div>

      {!type && (
        <p className="text-xs text-muted-foreground">
          Debés elegir un tipo de envío para continuar.
        </p>
      )}

      {/* delivery form */}
      {type === "delivery" && (
        <div className="space-y-2">
          <Input
            placeholder="Calle"
            value={form.shippingStreet}
            onChange={(e) =>
              setForm({ ...form, shippingStreet: e.target.value })
            }
          />

          <Input
            placeholder="Ciudad"
            value={form.shippingCity}
            onChange={(e) => setForm({ ...form, shippingCity: e.target.value })}
          />

          <Input
            placeholder="Provincia"
            value={form.shippingProvince}
            onChange={(e) =>
              setForm({ ...form, shippingProvince: e.target.value })
            }
          />

          <Input
            placeholder="Código postal"
            value={form.shippingPostal}
            onChange={(e) =>
              setForm({ ...form, shippingPostal: e.target.value })
            }
          />

          {!isDeliveryFormValid && (
            <p className="text-xs text-muted-foreground">
              Completá todos los datos de envío para continuar.
            </p>
          )}

          {/* shipping calculator */}
          <div className="flex flex-col gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={!canCalculateShipping}
              onClick={calculateShipping}
            >
              Calcular costo de envío
            </Button>

            {!canCalculateShipping && (
              <p className="text-xs text-muted-foreground">
                Ingresá el código postal para calcular el envío.
              </p>
            )}

            {shippingCost !== null && (
              <div className="flex justify-between text-sm text-muted-foreground border-t pt-3">
                <span>Costo de envío</span>
                <span className="font-semibold">${shippingCost}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* continue */}
      <Button
        className="w-full"
        disabled={!canContinue}
        onClick={() =>
          onNext(
            type === "pickup"
              ? {
                  shippingStreet: "Calle de retiro",
                  shippingCity: "Ciudad de retiro",
                  shippingProvince: "Provincia de retiro",
                  shippingPostal: "Cod. postal de retiro",
                  shippingCountry: "Argentina",
                  shippingNotes: "Notas de retiro",
                }
              : form,
          )
        }
      >
        Continuar
      </Button>
    </div>
  );
}
