import { ItemSection } from "@/types/resources/home-section-types";

export const LinkItem = ({ item }: { item: ItemSection }) => {
  if (!item.title || !item.linkUrl) return null;

  return (
    <a
      href={item.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex flex-col justify-center h-full
        rounded-xl border bg-white p-5 text-center
        shadow-sm hover:shadow-md transition
      "
    >
      <h3 className="text-lg font-semibold text-primary">{item.title}</h3>

      {item.subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
      )}
    </a>
  );
};
