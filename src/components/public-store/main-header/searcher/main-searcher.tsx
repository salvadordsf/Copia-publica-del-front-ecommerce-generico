"use client";

import { useSearchProducts } from "@/features/admin/products/services/products-querys";
import { MiniSearchWrapper } from "./main-searcher-wraper";

export function MainSearcher() {
  const { data, isLoading } = useSearchProducts();
  const products = data ?? [];

  return (
    <MiniSearchWrapper
      key={products.length}
      products={products}
      isLoading={isLoading}
    />
  );
}
