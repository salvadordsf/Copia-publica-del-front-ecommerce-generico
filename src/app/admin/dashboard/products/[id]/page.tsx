"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useProductById } from "@/features/products/services/products-querys";
import {
  useDeleteProducts,
  useUpdateProduct,
} from "@/features/products/services/products-mutations";
import UpdateProductDialog from "@/features/products/components/update/products-update-dialog";
import ResourceProperties from "@/components/dashboard/resource-components/resource-properties/resource-properties";
import ResourceActionsHandler from "@/components/dashboard/actions/actions-handler-component";
import ResourceNameDate from "@/components/dashboard/resource-components/resource-name-dates.tsx/resource-name-dates";

export default function IdProductPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProductById(id as string);
  const updateProduct = useUpdateProduct(id as string);
  const deleteProduct = useDeleteProducts();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !product)
    return <p className="pt-8">Error al cargar el producto.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <ResourceNameDate resource={product} />
        <ResourceProperties
          properties={[
            { key: "Nombre", value: product.name },
            { key: "Descripción", value: product.description },
            { key: "Precio", value: product.price },
            { key: "Stock", value: product.stock },
            { key: "Relevancia", value: product.relevance },
            { key: "Categoría", value: product.category.name },
            { key: "Subcategoría", value: product.subcategory.name },
          ]}
          optionals={{
            tags: { include: true, resourceTags: product.tags },
            status: { include: true, resourceStatus: product.status },
          }}
        />

        {/* Action btns */}
        <ResourceActionsHandler
          resource={product}
          resourceType="products"
          updateResourceDialog={<UpdateProductDialog product={product} />}
          updateResourceAction={updateProduct.mutateAsync}
          deleteResourceAction={deleteProduct.mutateAsync}
        />
      </div>
    </>
  );
}
