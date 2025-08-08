"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import ConfirmDeleteDialog from "@/components/dashboard/actions/delete/action-delete-dialog";
import { useRouter } from "next/navigation";
import ResourceProperties from "@/components/dashboard/resource-components/resource-properties/resource-properties";
import { useUserById } from "@/features/users/services/users-querys";
import {
  useDeleteUser,
  useUpdateUser,
} from "@/features/users/services/users-mutations";
import UpdateUserDialog from "@/features/users/components/update/user-update-dialog";
import ArchiveDialog from "@/components/dashboard/actions/archive/action-archive-action";
import ResourceActionsHandler from "@/components/dashboard/actions/actions-handler-component";

export default function IdUserPage() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useUserById(id as string);
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser(String(id));
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }
  console.log(user);

  if (isError || !user)
    return <p className="pt-8">Error al cargar el usuario.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <ResourceProperties
          properties={[
            { key: "Nombre", value: user.name },
            { key: "Email", value: user.email },
            { key: "Rol", value: user.role },
          ]}
          optionals={{
            status: { include: true, resourceStatus: user.status },
          }}
        />

        {/*
          ACTION BTNS

          ACTIVE   -> Update + Archive + Delete
          ARCHIVED -> Update + Unarchive(same component as Archive) + Delete
          DELETE   -> Reactive(same component as Delete)

        */}

        <ResourceActionsHandler
          resource={user}
          resourceType="users"
          updateResourceDialog={<UpdateUserDialog user={user} />}
          updateResourceAction={updateUser.mutateAsync}
          deleteResourceAction={deleteUser.mutateAsync}
        />
      </div>
    </>
  );
}
