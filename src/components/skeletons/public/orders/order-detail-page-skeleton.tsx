import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailPageSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          {/* Header top */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Skeleton className="h-6 w-48 max-w-[60%]" />
            {/* Status badge */}
            <Skeleton className="rounded-full w-24 h-7" />
          </div>

          {/* User info */}
          <Skeleton className="h-4 w-48 max-w-full" />
          {/* dates */}
          <Skeleton className="h-4 w-48 max-w-full" />
          <Skeleton className="h-4 w-48 max-w-full" />

          {/* Shipping info */}
          <div className="mt-2 rounded-md border bg-muted/40 p-3">
            <Skeleton className="h-4 w-40 max-w-full" />
            <div className="mt-1 text-xs text-muted-foreground space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* General order info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-20" />
              {/* Status badge */}
              <Skeleton className="rounded-full h-7 w-24" />
            </div>
          </div>

          {/* Manual payment block */}
          <div className="space-y-4 rounded-lg border p-4 text-sm">
            {/* Important reminder */}
            <div className="flex flex-col gap-1 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-yellow-900">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Payment instructions */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-[30%]" />
              <Skeleton className="h-4 w-full" />
            </div>
            {/* Payment data */}
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="flex justify-between gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="flex justify-between gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>

          {/* Product list */}
          <div className="flex flex-col">
            <Skeleton className="h-4 w-48 max-w-[60%] mb-4" />
            <div className="divide-y rounded-md border">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`order-product-skeleton-${i}`} className="flex items-center gap-4 p-4">
                  <div className="flex flex-1 flex-col min-w-0">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>

                  <div className="text-sm font-medium shrink-0">
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}