import ProductList from "./products-list";
import ProductSearchFilters from "./products-filters";

export default function ProductSearcher() {
  return(
    <section>
      <ProductSearchFilters />
      <ProductList />
    </section>
  )
}
