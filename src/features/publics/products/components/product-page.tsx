"use client";

import React from "react";
import { GenericItemsSlider } from "@/components/public-store/items-slider/generic-items-slider";
import { ProductCard } from "@/components/public-store/home/cards/product-card";
import { useSearchParams } from "next/navigation";
import {
  useProductById,
  useProducts,
} from "@/features/admin/products/services/products-querys";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "../../cart/components/add-to-cart";
import { useCartStore } from "../../cart/stores/cart-store";
import { useCartHydrated } from "../../cart/stores/use-cart-hydrated";

export const ProductPage = () => {
  //Get the productId from the path
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  //Get the product
  const { data: response, isLoading, isError } = useProductById(productId!);
  const product = response?.success ? response.data : null;

  //Get products with same category for relatedProducts
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useProducts({ categoryId: product?.categoryId!, status: "ACTIVE" });
  const relatedProducts = (
    products?.success ? products.data.data! : null
  )?.filter((prod) => prod.id !== productId);

  //Create the quantity state
  const [quantity, setQuantity] = React.useState(1);

  //Stock calculation using the cart quantity
  const hydrated = useCartHydrated();

  const cartQty = useCartStore(
    (s) => s.items.find((i) => i.productId === product?.id)?.quantity ?? 0,
  );

  const visualStock = hydrated
    ? Math.max(0, (product?.stock ?? 0) - cartQty)
    : (product?.stock ?? 0);

  //Return if any of this cant load
  if (isLoading) return <Loader2 />;
  if (isError || !response || !response.success)
    return <p>Error al cargar producto desde el hook</p>;
  if (!product) return <p>Error al cargar producto desde el hook</p>;

  if (isLoadingProducts) return <Loader2 className="" />;
  if (isErrorProducts || !products || !products.success)
    return <p>Error al cargar productos relacionados desde el hook</p>;
  if (!relatedProducts)
    return <p>Error al cargar productos relacionados desde el hook</p>;

  const imageSrc = product?.imageUrls;

  return (
    <main className="flex flex-col gap-8 px-4 py-6 md:px-8 max-w-3xl m-auto">
      {/* TOP SECTION */}
      <section className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10 max-w-70 md:max-w-3xl mx-auto">
        {/* IMAGES */}
        <div className="w-full max-w-sm mx-auto md:max-w-none">
          {imageSrc.length > 1 ? (
            <GenericItemsSlider
              title=""
              itemsType="producto"
              btns={{
                prev: `swiper-prev-btn-product-${product.id}`,
                next: `swiper-next-btn-product-${product.id}`,
              }}
              paginationDots={true}
              slidesSpaceConfig={{
                slidesPerView: 1,
                spaceBetween: 8,
              }}
              items={imageSrc.map((url, index) => [
                { id: `${product.id}-img-${index}` },
                <img
                  key={url}
                  src={url}
                  alt={product.name}
                  className="w-full h-auto rounded-xl object-cover"
                />,
              ])}
            />
          ) : (
            <img
              src={imageSrc[0]}
              alt={product.name}
              className="w-full h-auto rounded-xl object-cover"
            />
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-6 pt-6">
          <h1 className="text-2xl font-semibold leading-tight">
            {product.name}
          </h1>

          <p className="text-3xl font-bold tracking-tight text-primary">
            ${product.price.toLocaleString("es-AR")}
          </p>

          <div className="flex flex-col gap-4 pt-4">
            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border bg-white shadow-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((q) => Math.min(visualStock, q - 1))
                  }
                  className="rounded-none rounded-l-lg cursor-pointer"
                >
                  −
                </Button>

                <span className="w-10 text-center text-sm font-medium">
                  {quantity}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={quantity >= visualStock}
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="rounded-none rounded-r-lg cursor-pointer"
                >
                  +
                </Button>
              </div>

              <span className="text-sm text-muted-foreground">
                Stock disponible: {visualStock}
              </span>
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} quantity={quantity} />
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      {product.description && (
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Descripción</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {!!relatedProducts.length && (
        <article className="mt-6">
          <GenericItemsSlider
            title="Productos relacionados"
            itemsType="producto"
            btns={{
              prev: `swiper-prev-btn-related-products-${product.id}`,
              next: `swiper-next-btn-related-products-${product.id}`,
            }}
            slidesSpaceConfig={{
              slidesPerView: 2,
              spaceBetween: 5,
              breakpoints: {
                400: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 3,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 3,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 3,
                },
              },
            }}
            items={relatedProducts.map((prod) => [
              prod,
              <ProductCard key={prod.id} product={prod} />,
            ])}
          />
        </article>
      )}
    </main>
  );
};
