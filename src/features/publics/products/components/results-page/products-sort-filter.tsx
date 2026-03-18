"use client";

import { useProductsFiltersStore } from "../../stores/products-filters";

export function ProductsSortFilter() {
  const setSort = useProductsFiltersStore((s) => s.setSort);

  return (
    <select
      className="w-full rounded-md border px-3 py-2 text-sm"
      onChange={(e) => {
        const value = e.target.value;

        switch (value) {
          case "az":
            setSort("name", "asc");
            break;
          case "za":
            setSort("name", "desc");
            break;
          case "price-asc":
            setSort("price", "asc");
            break;
          case "price-desc":
            setSort("price", "desc");
            break;
          case "relevance":
            setSort("relevance", "desc");
            break;
          default:
            setSort(undefined, undefined);
        }
      }}
      defaultValue="relevance"
    >
      <option value="relevance">Más relevantes</option>
      <option value="az">Nombre A–Z</option>
      <option value="za">Nombre Z–A</option>
      <option value="price-asc">Precio: menor a mayor</option>
      <option value="price-desc">Precio: mayor a menor</option>
    </select>
  );
}
