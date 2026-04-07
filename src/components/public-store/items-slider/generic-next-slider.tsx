import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const GenericNextSliderBtn = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className={cn(
        "hidden md:flex",
        "absolute -right-6 top-1/2 -translate-y-1/2 z-10",
        "h-12 w-12 items-center justify-center",
        "rounded-full bg-white",
        "cursor-pointer",
        "border border-neutral-200",
        "transition-all duration-200 ease-out",
        "hover:shadow-lg hover:border-neutral-300",
        "active:scale-95"
      )}
      aria-label="siguiente"
    >
      <ChevronRight className="h-6 w-6 text-neutral-600" />
    </div>
  );
};
