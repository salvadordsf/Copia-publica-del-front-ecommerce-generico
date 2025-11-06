import ProductBulkFilters from "@/features/products/components/filter/products-filters";

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <h2 className="text-2xl font-bold">Filtrar productos en lote</h2>
        <ProductBulkFilters />
      </section>
    </main>
  );
}
