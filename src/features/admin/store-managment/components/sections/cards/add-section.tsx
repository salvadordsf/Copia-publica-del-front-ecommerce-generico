import { useRouter } from "next/navigation";

export const AddSection = () => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push("/admin/dashboard/home-store/sections/create")
      }
      className="
        w-full
        flex items-center justify-center
        gap-2
        rounded-xl
        border border-dashed border-gray-300
        p-4
        text-sm font-medium text-gray-600
        bg-gray-50
        cursor-pointer
        transition-all
        hover:bg-gray-100
        hover:border-gray-400
        hover:text-gray-800
      "
    >
      <span className="text-lg leading-none">＋</span>
      <span>Agregar sección</span>
    </div>
  );
};
