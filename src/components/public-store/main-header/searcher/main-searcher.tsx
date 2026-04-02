"use client";

import { useSearchProducts } from "@/features/admin/products/services/products-querys";
import { MiniSearchWrapper } from "./main-searcher-wraper";

export function MainSearcher() {
  const { data, isLoading } = useSearchProducts();

  if (!data) return null;

  return (
    <MiniSearchWrapper
      key={data?.length}
      products={data}
      isLoading={isLoading}
    />
  );
}
