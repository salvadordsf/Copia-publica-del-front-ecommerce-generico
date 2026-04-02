import { Skeleton } from "@/components/ui/skeleton";

export const AnnounncementCarouselSkeleton = () => {
  return (
    <div className="relative w-full border-b border-neutral-200 bg-neutral-900 h-9.5 flex items-center justify-center px-4">
      <Skeleton className="h-3 w-48 bg-neutral-700" />
    </div>
  );
};
