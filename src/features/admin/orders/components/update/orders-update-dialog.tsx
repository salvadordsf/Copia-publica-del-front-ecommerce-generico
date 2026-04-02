"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import UpdateDialog from "@/components/dashboard/actions/update/action-update-dialog";
import UpdateConfirmDialog from "@/components/dashboard/actions/update/action-update-confirmation-dialog";
import { useUpdateOrder } from "../../services/orders-mutations";
import { IUpdateOrder, UpdateOrderSchema } from "../../schemas/orders-schema";
import { useGetSession } from "@/features/admin/users/services/users-querys";
import { IUser } from "@/types/resources/user-type";
import { IOrder } from "@/types/resources/order-types";

const STATUS_LABELS = {
  READY: "Listo",
  PAID: "Pagada",
  SHIPPED: "Enviada",
  CANCELLED: "Cancelada",
} as const;

const STATUS_TRANSITIONS = {
  EDITOR: {
    PENDING: ["READY"],
    PAID: ["SHIPPED"],
  },
  ADMIN: {
    PENDING: ["READY"],
    READY: ["PAID", "CANCELLED"],
    PAID: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["CANCELLED"],
  },
} as const;

export default function UpdateOrderDialog({ order }: { order: IOrder }) {
  //Update hook
  const { mutateAsync, isError, error } = useUpdateOrder(order.id);

  //Get user role
  const { data } = useGetSession();
  const user = data?.user;
  useEffect(() => {
    console.log(user);
  }, [user]);

  //State for open/close dialog
  const [open, setOpen] = useState(false);

  //Form methods for Dialog > GenericForm
  const methods = useForm<IUpdateOrder>({
    resolver: zodResolver(UpdateOrderSchema),
    defaultValues: {
      status: order.status,
      shippingStreet: order.shippingStreet,
      shippingCity: order.shippingCity,
      shippingProvince: order.shippingProvince,
      shippingPostal: order.shippingPostal,
      shippingCountry: order.shippingCountry,
      shippingNotes: order.shippingNotes ?? "",
    },
  });

  const statusAvailablesOptions = useMemo(() => {
    if (!user) return [];

    const role = (user as unknown as IUser)
      .role as keyof typeof STATUS_TRANSITIONS;
    const currentStatus =
      order.status as keyof (typeof STATUS_TRANSITIONS)[keyof typeof STATUS_TRANSITIONS];

    const transitions = STATUS_TRANSITIONS[role]?.[currentStatus] ?? [];

    return transitions.map((s) => ({
      value: s,
      label: STATUS_LABELS[s] ?? s,
    }));
  }, [user, order.status]);

  //onSubmit form > try Update hook + toast
  const onSubmit = async (data: IUpdateOrder) => {
    try {
      if (statusAvailablesOptions.length === 0) {
        data.status = undefined;
      }

      if (data.status === order.status) {
        data.status = undefined;
      }

      await mutateAsync(data);
      toast.success("Orden actualizada correctamente.");
    } catch (error) {
      toastError(error as AxiosError, "general");
    } finally {
      setOpen(false);
    }
  };

  return (
    <UpdateDialog<IUpdateOrder>
      useFormMethods={methods}
      openState={[open, setOpen]}
      dialogConfig={{
        title: `Actualizar orden #${order.orderNumber} del usaurio "${order.user.name}"`,
        desc: "Los cambios son permanentes.",
      }}
      fields={[
        {
          name: "status",
          label: "⚠️ Precaución - Estado de la orden",
          selectLabel: "Estado de la orden",
          placeholder: "Seleccionar estado",
          type: "select",
          options: statusAvailablesOptions,
          defaultValue: order.status,
          className:
            "col-start-1 row-start-4 bg-yellow-200 p-2 rounded-lg border-2 border-yellow-400",
        },
        {
          name: "shippingCountry",
          label: "País de entrega",
          placeholder: "Escribe el país de entrega de la orden",
          type: "textarea",
          min: 3,
          className: "col-start-1 col-end-3 row-start-2",
        },
        {
          name: "shippingProvince",
          label: "Provincia de entrega",
          placeholder: "Escribe la provincia de entrega de la orden",
          type: "textarea",
          min: 3,
          className: "col-start-1 row-start-3",
        },
        {
          name: "shippingCity",
          label: "Ciudad de entrega",
          placeholder: "Escribe la ciudad de entrega de la orden",
          type: "textarea",
          min: 3,
          className: "col-start-2 row-start-3",
        },
        {
          name: "shippingPostal",
          label: "Código postal de entrega",
          placeholder: "Escribe el código postal de la orden",
          type: "textarea",
          min: 3,
          className: "col-start-1 row-start-4",
        },
        {
          name: "shippingStreet",
          label: "Dirección de entrega",
          placeholder: "Escribe la dirección (calle y número) de la orden",
          type: "textarea",
          min: 3,
          className: "col-start-2 row-start-4",
        },
        {
          name: "shippingNotes",
          label: "Notas de entrega",
          placeholder: "Escribe una nota opcional de la orden",
          type: "textarea",
          min: 3,
          className: "col-start-2 row-start-6",
        },
      ]}
      submitBtnConfig={{
        text: "Actualizar orden",
        type: "update",
      }}
      onSubmitAction={onSubmit}
      isError={isError}
      serverError={error}
      stepsAry={[
        <UpdateConfirmDialog
          key="update-confirm-dialog-step"
          resource={[
            {
              label: "Estado",
              original: order.status,
              edited: methods.getValues().status,
            },
            {
              label: "País de envío",
              original: order.shippingCountry,
              edited: methods.getValues().shippingCountry,
            },
            {
              label: "Provincia de envío",
              original: order.shippingProvince,
              edited: methods.getValues().shippingProvince,
            },
            {
              label: "Ciudad de envío",
              original: order.shippingCity,
              edited: methods.getValues().shippingCity,
            },
            {
              label: "Código postal de envío",
              original: order.shippingPostal,
              edited: methods.getValues().shippingPostal,
            },
            {
              label: "Dirección de envío: calle y número (dept.)",
              original: order.shippingStreet,
              edited: methods.getValues().shippingStreet,
            },
            {
              label: "Notas de envío",
              original: order.shippingNotes ?? "",
              edited: methods.getValues().shippingNotes,
            },
          ]}
        />,
      ]}
    />
  );
}
