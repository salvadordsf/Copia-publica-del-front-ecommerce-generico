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
import { useTagById } from "@/features/tags/services/tags-querys";
import { useParams } from "next/navigation";
import UpdateTagDialog from "@/features/tags/components/update/tags-update-dialog";
import {
  useDeleteTag,
  useUpdateTag,
} from "@/features/tags/services/tags-mutations";
import { useRouter } from "next/navigation";
import UiDivider from "@/components/dashboard/divider/divider";
import ResourceStatus from "@/components/dashboard/resource-components/resource-status/resource-status-resource";
import ResourceActionsHandler from "@/components/dashboard/actions/actions-handler-component";

export default function IdTagPage() {
  const { id } = useParams();
  const { data: tag, isLoading, isError } = useTagById(id as string);
  const updateTag = useUpdateTag(tag.id);
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

  if (isError || !tag) return <p className="pt-8">Error al cargar la tag.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        {/* Metatag */}
        <main>
          <h1 className="text-2xl font-bold capitalize">{tag.name}</h1>
          <div className="flex flex-col italic text-sm text-muted-foreground">
            <span>
              Creada el: {new Date(tag.createdAt).toLocaleDateString()}
            </span>
            <span>
              Última actualización:{" "}
              {new Date(tag.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <ResourceStatus status={tag.status} />
        </main>

        {/* Action btns */}
        <ResourceActionsHandler
          resource={tag}
          resourceType="tags"
          updateResourceDialog={
            <UpdateTagDialog tagId={tag.id} initialName={tag.name} />
          }
          updateResourceAction={updateTag.mutateAsync}
          deleteResourceAction={deleteTag.mutateAsync}
        />

        <UiDivider />
        {/* Products list */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Productos asociados</h2>

          {!tag.products?.length ? (
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
                {tag.products.map((product: any) => (
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
