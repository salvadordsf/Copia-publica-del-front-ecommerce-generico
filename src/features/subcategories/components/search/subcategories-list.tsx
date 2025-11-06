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
import { useRouter } from "next/navigation";
import { IGetSubcategoryQuery } from "../../schemas/subcategories-schema";
import { useSubcategories } from "../../services/subcategories-querys";

interface Props {
  query: IGetSubcategoryQuery
}

export default function SubcategoryList({ query }: Props) {
  const router = useRouter();

  const {
    data: { success, data: subcategory} = {},
    isLoading,
    isError,
  } = useSubcategories({
    name: query.name,
    status: query.status && query.status !== "false" ? query.status : undefined,
    categoryId: query.categoryId ? query.categoryId : undefined,
    category: query.category ? query.category : undefined,
    products: query.products ? query.products : undefined,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) return <p>Error al cargar subcategorías.</p>;
  if (!subcategory?.length) {
    return !query.name ? (
      <p>No se encontraron subcategorías.</p>
    ) : (
      <p>
        No se encontraron subcategorías al buscar{" "}
        <span className="italic font-semibold">"{query.name}"</span>.
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>Listado de subcategorías</TableCaption>
      <TableHeader>
        <TableRow className="text-lg font-bold">
          <TableHead className="font-bold">Nombre</TableHead>
          <TableHead className="font-bold text-center">Categoría</TableHead>
          <TableHead className="font-bold text-center">Productos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subcategory.map((subcategory: any) => (
          <TableRow
            key={subcategory.id}
            onClick={() =>
              router.push(`/admin/dashboard/subcategories/${subcategory.id}`)
            }
            className="cursor-pointer"
          >
            <TableCell className="capitalize italic">{subcategory.name}</TableCell>
            <TableCell className="text-center capitalize italic">
              {subcategory.category.name}
            </TableCell>
            <TableCell className="text-center">
              {subcategory._count.products}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
