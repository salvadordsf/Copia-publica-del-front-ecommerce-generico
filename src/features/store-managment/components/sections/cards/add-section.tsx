import { useRouter } from "next/navigation";

export const AddSection = () => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push("/admin/dashboard/home-store/sections/create")
      }
      className="w-full border-1 border-black p-2 text-center pt-5 pb-5 bg-gray-100 hover:bg-gray-200 cursor-pointer"
    >
      + Agregar sección
    </div>
  );
};
