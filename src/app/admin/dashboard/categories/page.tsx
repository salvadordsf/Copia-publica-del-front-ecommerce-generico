import UiDivider from "@/components/dashboard/divider/divider";
import CreateCategoryForm from "@/features/admin/categories/components/create/categories-create-form";
import CategorySearcher from "@/features/admin/categories/components/search/categories-searcher";

export default function CategoriesPage() {
  return (
    <>
      <main className="w-full flex flex-col gap-7 mt-4 pr-5">
        <section>
          <h2 className="text-2xl font-bold">Crear Categoría</h2>
          <CreateCategoryForm />
        </section>

        <UiDivider />

        <section>
          <h2 className="text-2xl font-bold">Buscar Categoría</h2>
          <CategorySearcher />
        </section>
      </main>
    </>
  );
}
