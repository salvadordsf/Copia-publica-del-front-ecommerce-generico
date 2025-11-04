"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTags } from "../../services/tags-querys";
import { IGetTagQuery } from "../../schemas/tags-schema";
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

interface Props {
  query: IGetTagQuery;
}

export default function TagList({ query }: Props) {
  const router = useRouter();

  const {
    data: { success, data: tags } = {},
    isLoading,
    isError,
  } = useTags({
    name: query.name ? query.name : undefined,
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

  if (isError) return <p>Error al cargar tags.</p>;
  if (!tags?.length) {
    return !query.name ? (
      <p>No se encontraron tags.</p>
    ) : (
      <p>
        No se encontraron tags al buscar{" "}
        <span className="italic font-semibold">"{query.name}"</span>.
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>Listado de tags</TableCaption>
      <TableHeader>
        <TableRow className="text-lg font-bold">
          <TableHead className="font-bold">Nombre</TableHead>
          <TableHead className="font-bold text-center">
            Cantidad de productos
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag: any) => (
          <TableRow
            key={tag.id}
            onClick={() => router.push(`/admin/dashboard/tags/${tag.id}`)}
            className="cursor-pointer"
          >
            <TableCell className="capitalize italic">{tag.name}</TableCell>
            <TableCell className="text-center">{tag._count.products}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
