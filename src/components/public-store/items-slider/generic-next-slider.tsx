import { ChevronRight } from "lucide-react";

export const GenericNextSliderBtn = ({ id }: { id: string }) => {
  return (
    <ChevronRight
      id={id}
      size={50}
      className="max-w-0 cursor-pointer text-neutral-400 hover:bg-neutral-200 rounded-2xl transition-all md:max-w-100 md:absolute md:-right-10 md:top-1/2 md:-translate-y-1/2 md:z-10"
    />
  );
};
