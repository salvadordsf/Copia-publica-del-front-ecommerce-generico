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
import { IGetCategoryQuery } from "../../schemas/categories-schema";
import { useCategories } from "../../services/categories-querys";

interface Props {
  query: IGetCategoryQuery;
}

export default function CategoryList({ query }: Props) {
  const router = useRouter();

  const {
    data: { success, data: categories} = {},
    isLoading,
    isError,
  } = useCategories({
    name: query.name,
    subcategories: query.subcategories ? query.subcategories : undefined,
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

  if (isError) return <p>Error al cargar categorías.</p>;
  if (!categories?.length) {
    return !query.name ? (
      <p>No se encontraron categorías.</p>
    ) : (
      <p>
        No se encontraron categorías al buscar{" "}
        <span className="italic font-semibold">"{query.name}"</span>.
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>Listado de categorías</TableCaption>
      <TableHeader>
        <TableRow className="text-lg font-bold">
          <TableHead className="font-bold">Nombre</TableHead>
          <TableHead className="font-bold text-center">Subcategorías</TableHead>
          <TableHead className="font-bold text-center">Productos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {success && categories.map((category: any) => (
          <TableRow
            key={category.id}
            onClick={() =>
              router.push(`/admin/dashboard/categories/${category.id}`)
            }
            className="cursor-pointer"
          >
            <TableCell className="capitalize italic">{category.name}</TableCell>
            <TableCell className="text-center">
              {category._count.subcategories}
            </TableCell>
            <TableCell className="text-center">
              {category._count.products}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
