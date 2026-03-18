import { ItemSection } from "@/types/resources/home-section-types";
import { ExternalLink } from "lucide-react";

export const TextItem = ({ item }: { item: ItemSection }) => {
  if (!item.title) return null;

  return (
    <div className="flex flex-col justify-center h-full rounded-xl border bg-white p-5 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 leading-tight">
        {item.title}
      </h3>

      {item.subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
      )}

      {item.linkUrl && (
        <a
          href={item.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-1 text-sm text-primary hover:underline"
        >
          Ver más
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
};
