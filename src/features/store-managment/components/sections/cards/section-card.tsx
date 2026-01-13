import { SECTIONS_TYPE_LABELS } from "@/features/store-managment/utils/sections-translations";
import { HomeSection } from "@/types/resources/home-section-types";
import { useRouter } from "next/navigation";

interface ISectionCard {
  section: HomeSection;
}

export const SectionCard = ({ section }: ISectionCard) => {
  const router = useRouter();

  const { type, position, title, isEnabled, _count, id } = section;
  const translateType = SECTIONS_TYPE_LABELS[type];

  return (
    <div
      onClick={() => router.push(`/admin/dashboard/home-store/sections/${id}`)}
      className={`
        w-full flex flex-col gap-2
        rounded-xl border p-4
        transition-all
        cursor-pointer
        ${
          isEnabled
            ? "border-green-500/40 bg-green-50/30"
            : "border-gray-300 bg-white"
        }
        hover:shadow-md
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-gray-800 uppercase">
            {translateType}
          </h3>
          <span className="text-xs text-gray-500">Posición: {position}</span>
        </div>

        {/* Status */}
        <span
          className={`
            px-2 py-0.5 rounded-full text-xs font-medium
            ${
              isEnabled
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }
          `}
        >
          {isEnabled ? "ACTIVO" : "DESACTIVADO"}
        </span>
      </div>

      {/* Optional title */}
      {title && <p className="text-xs text-gray-600 truncate">{title}</p>}

      {/* Footer */}
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <span>Elementos asociados:</span>

        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-xs font-medium text-gray-700">
          {_count.items}
        </span>
      </div>
    </div>
  );
};
