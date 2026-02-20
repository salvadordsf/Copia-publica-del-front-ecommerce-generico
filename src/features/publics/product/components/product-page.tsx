"use client";

import React from "react";
import { GenericItemsSlider } from "@/components/public-store/items-slider/generic-items-slider";
import { ProductCard } from "@/components/public-store/home/cards/product-card";
import { useSearchParams } from "next/navigation";
import {
  useProductById,
  useProducts,
} from "@/features/admin/products/services/products-querys";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const relatedProducts = (products?.success ? products.data.data! : null)?.filter(prod => prod.id !== productId)

  //Create the quantity state
  const [quantity, setQuantity] = React.useState(1);

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

  //This will be not necessary when add product,imageUrls in the Product schema
  const imageSrc = product?.imageUrls
    ? product?.imageUrls
      ? product?.imageUrls
      : [
          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
        ]
    : [
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
      ];

  return (
    <main className="flex flex-col gap-8 px-4 py-6 md:px-8">
      {/* TOP SECTION */}
      <section className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
        {/* IMAGES */}
        <div className="w-full">
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
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
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
                  disabled={quantity >= product.stock}
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="rounded-none rounded-r-lg cursor-pointer"
                >
                  +
                </Button>
              </div>

              <span className="text-sm text-muted-foreground">
                Stock disponible: {product.stock}
              </span>
            </div>

            {/* Add to cart */}
            <Button
              size="lg"
              disabled={product.stock === 0}
              className="w-full transition-all hover:scale-[1.01]"
            >
              {product.stock > 0 ? (
                <span className="cursor-pointer">
                  Agregar al carrito <ShoppingCart className="inline" />
                </span>
              ) : (
                "Sin stock"
              )}
            </Button>
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
