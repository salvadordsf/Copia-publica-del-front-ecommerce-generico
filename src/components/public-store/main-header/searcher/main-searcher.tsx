"use client";

import { useSearchProducts } from "@/features/products/services/products-querys";
import { useMiniSearch } from "react-minisearch";
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
