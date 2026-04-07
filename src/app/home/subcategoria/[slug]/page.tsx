import { SubcategoryPage } from "@/features/publics/subcategories/subcategory-page";
import { deslugify } from "@/utils/deslugify";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const { id } = await searchParams;
  const subName = deslugify(slug);

  return {
    title: subName,
    description: `Explora los productos de la subcategoría ${subName} en nuestro ecommerce genérico.`,

    openGraph: {
      title: subName,
      description: `Productos de ${subName}`,
      url: `/home/subcategoria/${slug}${id ? `?id=${id}` : ""}`,
    },
  };
}

export default function SubcategoryDedicatedPage({ params }: Props) {
  return <SubcategoryPage />;
}
