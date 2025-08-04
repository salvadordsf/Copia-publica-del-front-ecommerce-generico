import UiBreadcrumb from "@/components/dashboard/breadcrumb/breadcrumb";
import UiDivider from "@/components/dashboard/divider/divider";
import CreateTagForm from "@/features/tags/components/create/tags-create-form";
import TagSearcher from "@/features/tags/components/search/tags-searcher";

export default function TagsPage() {
  return (
    <main className="w-full flex flex-col gap-7 mt-4 pr-5">
      <section>
        <h2 className="text-2xl font-bold">Crear Tag</h2>
        <CreateTagForm />
      </section>

      <UiDivider />

      <section>
        <h2 className="text-2xl font-bold">Buscar Tags</h2>
        <TagSearcher />
      </section>
    </main>
  );
}
