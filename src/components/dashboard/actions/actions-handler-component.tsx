"use client";

import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { ReactNode } from "react";
import ArchiveDialog from "./archive/action-archive-action";
import ConfirmDeleteDialog from "./delete/action-delete-dialog";
import { useRouter } from "next/navigation";
import { getSpResourceName } from "./actions-handler-util";
import { IOrder, OrderStatus } from "@/types/resources/order-types";
import { TResourceStatus } from "@/types/resources/resource-status.types";
import { ApiResponse } from "@/types/responses.type";
import { IUpdateOrder } from "@/features/admin/orders/schemas/orders-schema";

type GenericResourceType<T> = T & {
  id: string;
  status: TResourceStatus;
  name: string;
};

type ResourceActionsHandlerProps<T> =
  | {
      resourceType: "orders";
      resource: IOrder;
      updateResourceDialog: ReactNode;
      updateResourceAction: UseMutateAsyncFunction<
        ApiResponse<IOrder>,
        Error,
        IUpdateOrder,
        unknown
      >;
      deleteResourceAction: UseMutateAsyncFunction<any, Error, string, unknown>;
    }
  | {
      resourceType: string;
      resource: GenericResourceType<T>;
      updateResourceDialog: ReactNode;
      updateResourceAction: any;
      deleteResourceAction: UseMutateAsyncFunction<any, Error, string, unknown>;
    };

export default function ResourceActionsHandler<T>({
  resource,
  resourceType,
  updateResourceDialog,
  updateResourceAction,
  deleteResourceAction,
}: ResourceActionsHandlerProps<T>) {
  let resourceEsName: string = getSpResourceName(resourceType);

  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 max-w-80 sm:flex-row sm:gap-4">
      {resource.status !== "DELETED" && (
        <>
          {updateResourceDialog}
          {resourceType !== "orders" && (
            <ArchiveDialog
              resourceStatus={resource.status as TResourceStatus}
              resourceType={resourceEsName}
              resourceName={(resource as GenericResourceType<T>).name}
              onConfirmAction={updateResourceAction}
            />
          )}
        </>
      )}
      {resourceType === "orders" ? (
        resource.status === "CANCELLED" && (
          <ConfirmDeleteDialog<IOrder>
            resourceStatus={resource.status as OrderStatus}
            resourceType={resourceEsName}
            resourceName={resource.orderNumber.toString()!}
            onConfirmActions={[
              () => {
                deleteResourceAction(resource.id);
                router.push(`/admin/dashboard/${resourceType}`);
              },
              updateResourceAction,
            ]}
          />
        )
      ) : (
        <ConfirmDeleteDialog<T>
          resourceStatus={resource.status}
          resourceType={resourceEsName}
          resourceName={(resource as GenericResourceType<T>).name}
          onConfirmActions={[
            () => {
              deleteResourceAction(resource.id);
              router.push(`/admin/dashboard/${resourceType}`);
            },
            updateResourceAction,
          ]}
        />
      )}
    </section>
  );
}

/*
ACTION BTNS

ACTIVE   -> Update + Archive + Delete
ARCHIVED -> Update + Unarchive(same component as Archive) + Delete
DELETE   -> Reactive(same component as Delete)

*/
