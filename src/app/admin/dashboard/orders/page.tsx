import OrderSearcher from "@/features/admin/orders/components/searcher/orders-searcher";

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-7 mt-4 pr-5">
      <section>
        <h2 className="text-2xl font-bold">Buscar órdenes</h2>
        <OrderSearcher />
      </section>

      {/* <UiDivider />

      <section>
        <h2 className="text-2xl font-bold">Crear orden</h2>
        
      </section> */}
    </main>
  );
}
