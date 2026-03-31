"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, useRouter } from "next/navigation";
import { useCategoryById } from "@/features/admin/categories/services/categories-querys";
import {
  useDeleteCategory,
  useUpdateCategory,
} from "@/features/admin/categories/services/categories-mutations";
import UpdateCategoryDialog from "@/features/admin/categories/components/update/categories-update-dialog";
import UiDivider from "@/components/dashboard/divider/divider";
import ResourceActionsHandler from "@/components/dashboard/actions/actions-handler-component";
import ResourceNameDate from "@/components/dashboard/resource-components/resource-name-dates.tsx/resource-name-dates";
import ResourceProperties from "@/components/dashboard/resource-components/resource-properties/resource-properties";
import ResourceMigrateDialog from "@/features/admin/products/components/update/migration/products-update-migrate-dialog";
import { ICategory } from "@/types/resources/category-type";
import { ISubcategory } from "@/types/resources/subcategory-type";
import { IProduct } from "@/types/resources/product-type";

export default function IdCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading, isError } = useCategoryById(id as string);
  const category = data?.success ? data.data : null;

  const updateCategory = useUpdateCategory(id as string);
  const deleteCategory = useDeleteCategory();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !category)
    return <p className="pt-8">Error al cargar la categoría.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <ResourceNameDate resource={category} />

        <ResourceProperties
          properties={[
            { key: "Cant. productos", value: category.products.length },
            {
              key: "Cant. subcategorías",
              value: category.subcategories.length,
            },
          ]}
          optionals={{
            status: { include: true, resourceStatus: category.status },
          }}
        />

        {/* Action btns */}
        <ResourceActionsHandler<ICategory>
          resource={category}
          resourceType="categories"
          updateResourceDialog={
            <UpdateCategoryDialog
              categoryId={category.id}
              initialName={category.name}
            />
          }
          updateResourceAction={updateCategory.mutateAsync}
          deleteResourceAction={deleteCategory.mutateAsync}
        />

        <UiDivider />

        {/* Subcategories list */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Subcategorías asociadas</h2>

          {!category.subcategories?.length ? (
            <p className="text-muted-foreground">
              Sin subcategorías asociadas.
            </p>
          ) : (
            <Table>
              <TableCaption>
                Lista de sucategorías asignadas a esta categoría
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Nombre</TableHead>
                  <TableHead className="font-semibold text-center">
                    Productos
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.subcategories.map((subcategory: ISubcategory) => (
                  <TableRow
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/admin/dashboard/subcategories/${subcategory.id}`,
                      )
                    }
                    key={subcategory.id}
                  >
                    <TableCell className="capitalize">
                      {subcategory.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {subcategory._count.products}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>

        <UiDivider />

        {/* Products list */}
        <section className="space-y-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-10">
            <h2 className="text-xl font-semibold">Productos asociados</h2>
            {category && category.products?.length > 0 && (
              <ResourceMigrateDialog
                resourceName={category.name}
                resourceToUpdateType="products"
                resourcesToUpdate={category.products}
              />
            )}
          </div>

          {!category.products?.length ? (
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
                {category.products.map((product: IProduct) => (
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
