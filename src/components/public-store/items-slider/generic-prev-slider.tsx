import { ChevronLeft } from "lucide-react";

export const GenericPrevSliderBtn = ({ id }: { id: string }) => {
  return (
    <ChevronLeft
      size={50}
      id={id}
      className="max-w-0 cursor-pointer text-neutral-400 hover:bg-neutral-200 rounded-2xl transition-all md:max-w-100 md:absolute md:-left-10 md:top-1/2 md:-translate-y-1/2 md:z-10"
    />
  );
};
