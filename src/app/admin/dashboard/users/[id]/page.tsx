"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import ResourceProperties from "@/components/dashboard/resource-components/resource-properties/resource-properties";
import { useUserById } from "@/features/users/services/users-querys";
import {
  useDeleteUser,
  useUpdateUser,
} from "@/features/users/services/users-mutations";
import UpdateUserDialog from "@/features/users/components/update/user-update-dialog";
import ResourceActionsHandler from "@/components/dashboard/actions/actions-handler-component";
import ResourceNameDate from "@/components/dashboard/resource-components/resource-name-dates.tsx/resource-name-dates";

export default function IdUserPage() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useUserById(id as string);
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser(id as string);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !user)
    return <p className="pt-8">Error al cargar el usuario.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <ResourceNameDate resource={user} />

        <ResourceProperties
          properties={[
            { key: "Nombre", value: user.name },
            { key: "Email", value: user.email },
          ]}
          optionals={{
            role: { include: true, userRole: user.role },
            status: { include: true, resourceStatus: user.status },
          }}
        />

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
