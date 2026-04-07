import { getProductById } from "@/features/admin/products/services/products-axios";
import { ProductPage } from "@/features/publics/products/components/product-page";
import { slugify } from "@/utils/slugify";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { id } = await searchParams;
  const product = id ? await getProductById(id) : null;

  if (product?.success) {
    return {
      title: product?.data.name,
      description: product.data.description,

      openGraph: {
        title: product?.data.name,
        description: product.data.description,
        url: `/home/producto/${slugify(product.data.name)}?id=${id}`,
      },
    };
  } else {
    return {
      title: "Producto no encontrado",
      description: `Explora productos en nuestro ecommerce genérico.`,
      openGraph: {
        title: "Producto no encontrado",
        description: `Explora productos en nuestro ecommerce genérico.`,
        url: `/home/productos`,
      },
    };
  }
}

export default function ProductDedicatedPage() {
  return <ProductPage />;
}
