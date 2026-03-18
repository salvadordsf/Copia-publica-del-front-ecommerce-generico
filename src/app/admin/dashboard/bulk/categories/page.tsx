import CategoriesBulkFiltersResults from "@/features/admin/categories/components/filter/categories-bulk-counter";
import CategoriesBulkFilters from "@/features/admin/categories/components/filter/categories-filters";

export default function CategoriesPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <p>Aplicá actualizaciones o eliminaciones masivas sobre un conjunto de categorías filtradas.</p>
        <h2 className="pt-1 text-2xl font-bold">Filtrar categorías en lote</h2>
        <CategoriesBulkFilters />
        <CategoriesBulkFiltersResults />
      </section>
    </main>
  );
}
