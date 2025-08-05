"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import ConfirmDeleteDialog from "@/components/dashboard/actions/action-delete-dialog";
import { useRouter } from "next/navigation";
import { useProductById } from "@/features/products/services/products-querys";
import { useDeleteProducts } from "@/features/products/services/products-mutations";
import UpdateProductDialog from "@/features/products/components/update/products-update-dialog";
import ResourceStatus from "@/components/dashboard/resource-components/resource-status/resource-status-resource";
import ResourceProperties from "@/components/dashboard/resource-components/resource-properties/resource-properties";
import { useUserById } from "@/features/users/services/users-querys";
import { useDeleteUser } from "@/features/users/services/users-mutations";
import UpdateUserDialog from "@/features/users/components/update/user-update-dialog";

export default function IdUserPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useUserById(id as string);
  const deleteProduct = useDeleteUser();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !data)
    return <p className="pt-8">Error al cargar el usuario.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <ResourceProperties 
          properties={[
            {key: "Nombre", value: data.name},
            {key: "Email", value: data.email},
            {key: "Rol", value: data.role},
          ]}
          optionals={{
            status: {include: true, resourceStatus: data.status},
          }}
        />

        {/* Action btns */}
        <section className="flex gap-4">
          <UpdateUserDialog user={data} />
          <ConfirmDeleteDialog
            trigger={<Button variant="destructive">Eliminar</Button>}
            resourceType="user"
            resourceName={data.name}
            onConfirmAction={() => {
              deleteProduct.mutateAsync(data.id);
              router.push("/admin/dashboard/users");
            }}
          />
        </section>
      </div>
    </>
  );
}
