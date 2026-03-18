import UiDivider from "@/components/dashboard/divider/divider";
import CreateProductForm from "@/features/products/components/create/products-create-form";
import ProductSearcher from "@/features/products/components/searcher/products-searcher";

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <h2 className="text-2xl font-bold">Crear Producto</h2>
        <CreateProductForm />
      </section>

      <UiDivider />

      <section>
        <h2 className="text-2xl font-bold">Buscar Productos</h2>
        <ProductSearcher />
      </section>
    </main>
  );
}
