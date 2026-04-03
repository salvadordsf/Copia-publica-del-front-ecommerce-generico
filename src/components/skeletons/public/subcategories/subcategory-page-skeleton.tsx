import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { ProductGridSkeleton } from "../products/products-results-container-skeleton";

export function SubcategoryPageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Breadcrumb + header */}
      <header className="flex flex-col gap-2">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Skeleton className="w-16 h-3" />
          <ChevronRight size={12} />
          <Skeleton className="w-16 h-3" />
          <ChevronRight size={12} />
          <Skeleton className="w-16 h-3" />
        </nav>

        <Skeleton className="w-40 h-6" />
        <div className="h-px w-10 bg-neutral-200" />
      </header>

      {/* products */}
      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-40 h-6" />
          <div className="h-px w-8 bg-neutral-200" />
        </div>
        <ProductGridSkeleton />
      </section>
    </div>
  );
}
