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

export default function IdProductPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useProductById(id as string);
  const deleteProduct = useDeleteProducts();
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
    return <p className="pt-8">Error al cargar el producto.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <ResourceProperties 
          properties={[
            {key: "Nombre", value: data.name},
            {key: "Descripción", value: data.description},
            {key: "Precio", value: data.price},
            {key: "Stock", value: data.stock},
            {key: "Relevancia", value: data.relevance},
            {key: "Categoría", value: data.category.name},
            {key: "Subcategoría", value: data.subcategory.name},
          ]}
          optionals={{
            tags: {include: true, resourceTags: data.tags},
            status: {include: true, resourceStatus: data.status},
          }}
        />

        {/* Action btns */}
        <section className="flex gap-4">
          <UpdateProductDialog product={data} />
          <ConfirmDeleteDialog
            trigger={<Button variant="destructive">Eliminar</Button>}
            resourceType="product"
            resourceName={data.name}
            onConfirmAction={() => {
              deleteProduct.mutateAsync(data.id);
              router.push("/admin/dashboard/products");
            }}
          />
        </section>
      </div>
    </>
  );
}
