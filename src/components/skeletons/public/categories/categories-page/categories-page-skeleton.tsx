import { CategoryPageGridSkeleton } from "./categories-home-page-grid-skeleton";

export const CategoriesPageSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
          Explorá
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          Todas las categorías
        </h1>
        <div className="h-px w-10 bg-neutral-200 mt-2" />
      </header>

      {/* Grid */}
      <CategoryPageGridSkeleton count={10} />
    </div>
  );
};
