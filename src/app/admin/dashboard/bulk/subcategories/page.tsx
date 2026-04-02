import SubcategoriesBulkFiltersResults from "@/features/admin/subcategories/components/filter/subcategories-bulk-counter";
import SubcategoryBulkFilters from "@/features/admin/subcategories/components/filter/subcategories-filters";

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <p>
          Aplicá actualizaciones o eliminaciones masivas sobre un conjunto de
          subcategorías filtradas.
        </p>
        <h2 className="pt-1 text-2xl font-bold">
          Filtrar subcategorías en lote
        </h2>
        <SubcategoryBulkFilters />
        <SubcategoriesBulkFiltersResults />
      </section>
    </main>
  );
}
