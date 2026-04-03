import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader className="relative flex flex-row items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Skeleton className="h-7 w-7" />
          </div>

          <div className="flex flex-col">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-40 mt-2" />
          </div>
          <div className="absolute right-5 top-0 flex flex-row gap-1">
            <Skeleton className="h-6 w-6 p-1" />
            <Skeleton className="h-6 w-6 p-1" />
          </div>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          <div className="space-y-3">
            <Skeleton className="h-6 w-50 p-1" />

            <div className="space-y-3">
              <Card>
                <CardContent className="space-y-4 pt-6 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20 p-1" />
                      <Skeleton className="h-4 w-50 p-1" />
                    </div>

                    {/* Status badge */}
                    <Skeleton className="rounded-full px-3 py-1 text-xs font-medium" />
                  </div>

                  {/* Addres */}
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20 p-1" />
                    <Skeleton className="h-4 w-full p-1" />
                    <Skeleton className="h-4 w-[50%] p-1" />
                    <Skeleton className="h-4 w-30 p-1" />
                  </div>

                  {/* products */}
                  <div className="space-y-2 flex gap-1">
                    <Skeleton className="h-4 w-30 p-1" />
                    <Skeleton className="h-4 w-5 p-1" />
                  </div>

                  <div className="flex items-center justify-between border-t pt-3">
                    <Skeleton className="h-4 w-30 p-1" />
                    <Skeleton className="h-4 w-20 p-1" />
                  </div>

                  <div className="flex justify-end gap-1">
                    <Skeleton className="h-8 w-30 p-1" />
                    <Skeleton className="h-8 w-30 p-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
