import ProductBulkFiltersResults from "@/features/products/components/filter/product-bulk-counter";
import ProductBulkFilters from "@/features/products/components/filter/products-filters";

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <p>Aplicá actualizaciones o eliminaciones masivas sobre un conjunto de productos filtrado.</p>
        <h2 className="pt-1 text-2xl font-bold">Filtrar productos en lote</h2>
        <ProductBulkFilters />
        <ProductBulkFiltersResults />
      </section>
    </main>
  );
}
