"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link2 } from "lucide-react";
import { useParams } from "next/navigation";
import UiDivider from "@/components/dashboard/divider/divider";
import { useSubcategoryById } from "@/features/subcategories/services/subcategories-querys";
import {
  useDeleteSubcategories,
  useUpdateSubcategory,
} from "@/features/subcategories/services/subcategories-mutations";
import Link from "next/link";
import UpdateSubcategoryDialog from "@/features/subcategories/components/update/subcategories-update-dialog";
import ResourceActionsHandler from "@/components/dashboard/actions/actions-handler-component";
import ResourceNameDate from "@/components/dashboard/resource-components/resource-name-dates.tsx/resource-name-dates";
import ResourceProperties from "@/components/dashboard/resource-components/resource-properties/resource-properties";

export default function IdSubcategoryPage() {
  const { id } = useParams();
  const {
    data: subcategory,
    isLoading,
    isError,
  } = useSubcategoryById(id as string);
  const updateSubcategory = useUpdateSubcategory(id as string);
  const deleteSubcategory = useDeleteSubcategories();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !subcategory)
    return <p className="pt-8">Error al cargar la subcategoría.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <ResourceNameDate resource={subcategory} />

        <ResourceProperties
          properties={[
            { key: "Categoría", value: subcategory.category.name },
            { key: "Cant. productos", value: subcategory.products.length },
          ]}
          optionals={{
            status: { include: true, resourceStatus: subcategory.status },
          }}
        />

        {/* Action btns */}
        <ResourceActionsHandler
          resource={subcategory}
          resourceType="subcategories"
          updateResourceDialog={
            <UpdateSubcategoryDialog
              subcategoryId={subcategory.id}
              initialName={subcategory.name}
              initialCategoryId={subcategory.category.id}
            />
          }
          updateResourceAction={updateSubcategory.mutateAsync}
          deleteResourceAction={deleteSubcategory.mutateAsync}
        />

        <UiDivider />

        {/* category section */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Categoría padre</h2>
          <Link href={`/admin/dashboard/categories/${subcategory.category.id}`}>
            <Button
              variant="link"
              className="text-xl capitalize cursor-pointer"
            >
              <Link2 />
              {subcategory.category.name}
            </Button>
          </Link>
        </section>
        <UiDivider />
        {/* Products list */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Productos asociados</h2>

          {!subcategory.products?.length ? (
            <p className="text-muted-foreground">Sin productos asociados.</p>
          ) : (
            <Table>
              <TableCaption>
                Lista de productos asignados a esta categoría
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Nombre</TableHead>
                  <TableHead className="font-semibold text-center">
                    Precio
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Stock
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subcategory.products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell className="capitalize">{product.name}</TableCell>
                    <TableCell className="text-center">
                      ${product.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.stock}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </div>
    </>
  );
}
