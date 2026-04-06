"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useProductById } from "@/features/admin/products/services/products-querys";
import {
  useDeleteProducts,
  useUpdateProduct,
} from "@/features/admin/products/services/products-mutations";
import UpdateProductDialog from "@/features/admin/products/components/update/products-update-dialog";
import ResourceProperties from "@/components/dashboard/resource-components/resource-properties/resource-properties";
import ResourceActionsHandler from "@/components/dashboard/actions/actions-handler-component";
import ResourceNameDate from "@/components/dashboard/resource-components/resource-name-dates.tsx/resource-name-dates";
import ProductTagsManager from "@/features/admin/products/components/update/product-tags-manager";
import { GenericItemsSlider } from "@/components/public-store/items-slider/generic-items-slider";
import { IProduct } from "@/types/resources/product-type";
import { ITag } from "@/types/resources/tag-type";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinary/cloudinary-loader";

export default function IdProductPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useProductById(id as string);
  const product = data?.success ? data.data : null;

  const updateProduct = useUpdateProduct(id as string);
  const deleteProduct = useDeleteProducts();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !product)
    return <p className="pt-8">Error al cargar el producto.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <ResourceNameDate resource={product} />
        {/* IMAGES */}
        <div className="w-full max-w-xs">
          {product.imageUrls.length > 1 ? (
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
              items={product.imageUrls.map((url: string, index: number) => [
                { id: `${product.id}-img-${index}` },
                <Image
                  key={url}
                  src={url}
                  width={500}
                  height={500}
                  priority={index === 0}
                  alt={`${product.name} - imagen ${index + 1}`}
                  className="w-full h-48 rounded-xl object-cover"
                  loader={cloudinaryLoader}
                  sizes="(max-width: 768px) 100vw, 320px"
                  quality={80}
                />,
              ])}
            />
          ) : (
            <Image
              src={
                product.imageUrls[0] ??
                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              }
              width={500}
              height={500}
              priority
              alt={product.name}
              className="w-full h-48 rounded-xl object-cover"
              loader={cloudinaryLoader}
              sizes="320px"
              quality={80}
            />
          )}
        </div>
        <ResourceProperties
          properties={[
            { key: "Nombre", value: product.name },
            { key: "Descripción", value: product.description },
            { key: "Precio", value: product.price },
            { key: "Stock", value: product.stock },
            { key: "Relevancia", value: product.relevance },
            { key: "Categoría", value: product.category.name },
            { key: "Subcategoría", value: product.subcategory.name },
          ]}
          optionals={{
            tags: { include: true, resourceTags: product.tags },
            status: { include: true, resourceStatus: product.status },
          }}
        />

        {/* Action btns */}
        <ResourceActionsHandler<IProduct>
          resource={product}
          resourceType="products"
          updateResourceDialog={<UpdateProductDialog product={product} />}
          updateResourceAction={updateProduct.mutateAsync}
          deleteResourceAction={deleteProduct.mutateAsync}
        />
        <ProductTagsManager
          product={product}
          initialTags={product.tags.map((t: ITag) => t.id)}
        />
      </div>
    </>
  );
}
