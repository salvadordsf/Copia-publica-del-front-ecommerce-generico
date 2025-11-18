"use client";

import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { ReactNode } from "react";
import ArchiveDialog from "./archive/action-archive-action";
import ConfirmDeleteDialog from "./delete/action-delete-dialog";
import { useRouter } from "next/navigation";
import { getSpResourceName } from "./actions-handler-util";

interface ResourceActionsHandlerProps {
  resource: any;
  resourceType: string;
  updateResourceDialog: ReactNode;
  updateResourceAction: any;
  deleteResourceAction: UseMutateAsyncFunction<any, Error, string, unknown>;
}

export default function ResourceActionsHandler({
  resource,
  resourceType,
  updateResourceDialog,
  updateResourceAction,
  deleteResourceAction,
}: ResourceActionsHandlerProps) {
  let resourceEsName: string = getSpResourceName(resourceType);

  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 max-w-80 sm:flex-row sm:gap-4">
      {resource.status !== "DELETED" && (
        <>
          {updateResourceDialog}
          <ArchiveDialog
            resourceStatus={resource.status}
            resourceType={resourceEsName}
            resourceName={resource.name}
            onConfirmAction={updateResourceAction}
          />
        </>
      )}
      <ConfirmDeleteDialog
        resourceStatus={resource.status}
        resourceType={resourceEsName}
        resourceName={resource.name}
        onConfirmActions={[
          () => {
            deleteResourceAction(resource.id);
            router.push(`/admin/dashboard/${resourceType}`);
          },
          updateResourceAction,
        ]}
      />
    </section>
  );
}

/*
ACTION BTNS

ACTIVE   -> Update + Archive + Delete
ARCHIVED -> Update + Unarchive(same component as Archive) + Delete
DELETE   -> Reactive(same component as Delete)

*/
