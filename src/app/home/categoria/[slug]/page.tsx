import { CategoryPageSkeleton } from "@/components/skeletons/public/categories/category-page-skeleton";
import { CategoryPage } from "@/features/publics/categories/category-page";
import { deslugify } from "@/utils/deslugify";
import { Metadata } from "next";
import { Suspense } from "react";

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
  const categoryName = deslugify(slug);

  return {
    title: categoryName,
    description: `Explorá los productos de ${categoryName} en nuestro Ecommerce Genérico.`,
    openGraph: {
      title: categoryName,
      description: `Explorá los productos de ${categoryName}.`,
      url:
        id && slug ? `/home/categorias/${slug}?id=${id}` : "/home/categorias",
    },
  };
}

export default function CategoryDedicatedPage() {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryPage />
    </Suspense>
  );
}
