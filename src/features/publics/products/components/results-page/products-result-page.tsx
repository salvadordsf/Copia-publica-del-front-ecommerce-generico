"use client";

import { ProductsFilters } from "./products-filters";
import { ProductsResultsContainer } from "./products-results-container";

export default function ProductsResultsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <ProductsFilters />
        <ProductsResultsContainer />
      </div>
    </div>
  );
}
