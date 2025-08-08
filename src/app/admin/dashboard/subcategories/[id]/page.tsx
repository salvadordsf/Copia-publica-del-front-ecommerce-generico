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
import ConfirmDeleteDialog from "@/components/dashboard/actions/delete/action-delete-dialog";
import { useParams, useRouter } from "next/navigation";
import UiDivider from "@/components/dashboard/divider/divider";
import { useSubcategoryById } from "@/features/subcategories/services/subcategories-querys";
import { useDeleteSubcategories } from "@/features/subcategories/services/subcategories-mutations";
import Link from "next/link";
import UpdateSubcategoryDialog from "@/features/subcategories/components/update/subcategories-update-dialog";

export default function IdSubcategoryPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useSubcategoryById(id as string);
  const deleteSubcategory = useDeleteSubcategories();
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
    return <p className="pt-8">Error al cargar la subcategoría.</p>;

  return (
    <div className="-translate-x-2 sm:-translate-0">
      <div className="pt-5 space-y-6">
        {/* Metadata */}
        <main>
          <h1 className="text-2xl font-bold capitalize">{data.name}</h1>
          <div className="flex flex-col italic text-sm text-muted-foreground">
            <span>Creada el: {new Date(data.createdAt).toLocaleString()}</span>
            <span>
              Última actualización: {new Date(data.updatedAt).toLocaleString()}
            </span>
          </div>
        </main>

        {/* Action btns */}
        <section className="flex gap-4">
          <UpdateSubcategoryDialog subcategoryId={data.id} initialName={data.name} initialCategoryId={data.category.id}/>
          <ConfirmDeleteDialog
            trigger={<Button variant="destructive">Eliminar</Button>}
            resourceType="subcategoría"
            resourceName={data.name}
            onConfirmAction={() => {
              deleteSubcategory.mutateAsync(data.id);
              router.push("/admin/dashboard/subcategories");
            }}
          />
        </section>
        <UiDivider />

        {/* category section */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Categoría padre</h2>
          <Link href={`/admin/dashboard/categories/${data.category.id}`}>
            <Button
              variant="link"
              className="text-xl capitalize cursor-pointer"
            >
              <Link2 />
              {data.category.name}
            </Button>
          </Link>
        </section>
        <UiDivider />
        {/* Products list */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Productos asociados</h2>

          {!data.products?.length ? (
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
                {data.products.map((product: any) => (
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
    </div>
  );
}
