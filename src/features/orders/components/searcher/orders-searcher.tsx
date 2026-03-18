import OrdersSearchFilters from "./orders-filters";
import OrderList from "./orders-list";

export default function OrderSearcher() {
  return (
    <section>
      <OrdersSearchFilters />
      <OrderList />
    </section>
  );
}
