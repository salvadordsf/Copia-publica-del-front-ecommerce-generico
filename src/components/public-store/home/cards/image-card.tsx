import cloudinaryLoader from "@/lib/cloudinary/cloudinary-loader";
import { ItemSection } from "@/types/resources/home-section-types";
import Image from "next/image";

export const ImageItem = ({ item }: { item: ItemSection }) => {
  if (!item.imageUrl) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-sm aspect-square">
      <Image
        src={item.imageUrl}
        alt={item.title ?? "Imagen"}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="w-full h-full object-cover aspect-[4/3]"
        loader={cloudinaryLoader}
        quality={75}
      />

      {(item.title || item.subtitle) && (
        <div className="absolute inset-x-0 bottom-0 bg-black/40 p-3">
          {item.title && (
            <p className="text-sm font-semibold text-white">{item.title}</p>
          )}
          {item.subtitle && (
            <p className="text-xs text-white/80">{item.subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
};
