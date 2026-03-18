import { ItemSection } from "@/types/resources/home-section-types";

export const ImageItem = ({ item }: { item: ItemSection }) => {
  if (!item.imageUrl) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-sm">
      <img
        src={item.imageUrl}
        alt={item.title ?? "Imagen"}
        className="w-full h-full object-cover aspect-[4/3]"
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
