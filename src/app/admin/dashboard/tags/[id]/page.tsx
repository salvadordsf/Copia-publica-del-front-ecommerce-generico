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
import { useTagById } from "@/features/tags/services/tags-querys";
import { useParams } from "next/navigation";
import UpdateTagDialog from "@/features/tags/components/update/tags-update-dialog";
import { useDeleteTag } from "@/features/tags/services/tags-mutations";
import ConfirmDeleteDialog from "@/components/dashboard/actions/action-delete-dialog";
import { useRouter } from "next/navigation";
import UiBreadcrumb from "@/components/dashboard/breadcrumb/breadcrumb";
import UiDivider from "@/components/dashboard/divider/divider";
import ResourceStatus from "@/components/dashboard/resource-components/resource-status/resource-status-resource";

export default function IdTagPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useTagById(id as string);
  const deleteTag = useDeleteTag();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !data) return <p className="pt-8">Error al cargar la tag.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        {/* Metadata */}
        <main>
          <h1 className="text-2xl font-bold capitalize">{data.name}</h1>
          <div className="flex flex-col italic text-sm text-muted-foreground">
            <span>
              Creada el: {new Date(data.createdAt).toLocaleDateString()}
            </span>
            <span>
              Última actualización:{" "}
              {new Date(data.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <ResourceStatus status={data.status} />
        </main>

        {/* Action btns */}
        <section className="flex gap-4">
          <UpdateTagDialog tagId={data.id} initialName={data.name} />
          <ConfirmDeleteDialog
            trigger={<Button variant="destructive">Eliminar</Button>}
            resourceType="tag"
            resourceName={data.name}
            onConfirmAction={() => {
              deleteTag.mutateAsync(data.id);
              router.push("/admin/dashboard/tags");
            }}
          />
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
                Lista de productos asignados a esta tag
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell className="capitalize">{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
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
