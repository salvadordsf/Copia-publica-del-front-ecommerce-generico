import UiDivider from "@/components/dashboard/divider/divider";
import CreateProductForm from "@/features/products/components/create/products-create-form";
import ProductSearcher from "@/features/products/components/searcher/products-searcher";

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <h2 className="text-2xl font-bold">Buscar órdenes</h2>
        <ProductSearcher />
      </section>

      <UiDivider />

      <section>
        <h2 className="text-2xl font-bold">Crear orden</h2>
        <CreateProductForm />
      </section>
    </main>
  );
}
