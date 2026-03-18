import Link from "next/link";

export const SearchEmpty = () => {
  return (
    <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-xl p-3 z-50">
      <ul className="divide-y">
        <li className="py-2 px-2 rounded italic text-center">
          <span className="font-medium">
            No se encontraron productos para esta búsqueda
          </span>
        </li>

        <Link href="/home/categorias">
          <li className="py-2 cursor-pointer hover:bg-neutral-100 px-2 rounded">
            <span className="font-medium">
              Ir a todas las{" "}
              <span className="underline font-semibold">categorías</span>
            </span>
          </li>
        </Link>

        <Link href="/home/productos">
          <li className="py-2 cursor-pointer hover:bg-neutral-100 px-2 rounded">
            <span className="font-medium">
              Ir a todos los{" "}
              <span className="underline font-semibold">productos</span>
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};
