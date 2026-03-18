import UiBreadcrumb from "@/components/dashboard/breadcrumb/breadcrumb";
import UiDivider from "@/components/dashboard/divider/divider";
import CreateSubcategoryForm from "@/features/subcategories/components/create/subcategories-create-form";
import SubcategorySearcher from "@/features/subcategories/components/search/subcategories-searcher";

export default function SubcategoryPage() {
  return (
    <main className="w-full flex flex-col gap-7 mt-4 pr-5">
      <section>
        <h2 className="text-2xl font-bold">Crear Subcategoría</h2>
        <CreateSubcategoryForm />
      </section>

      <UiDivider />

      <section>
        <h2 className="text-2xl font-bold">Buscar Subcategoría</h2>
        <SubcategorySearcher />
      </section>
    </main>
  );
}
