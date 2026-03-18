import TagsBulkFiltersResults from "@/features/tags/components/filter/tags-bulk-counter";
import TagsBulkFilters from "@/features/tags/components/filter/tags-filters";

export default function TagsBulkActionsPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <p>
          Aplicá actualizaciones o eliminaciones masivas sobre un conjunto de
          etiquetas filtradas.
        </p>
        <h2 className="pt-1 text-2xl font-bold">Filtrar etiquetas en lote</h2>
        <TagsBulkFilters />
        <TagsBulkFiltersResults />
      </section>
    </main>
  );
}
