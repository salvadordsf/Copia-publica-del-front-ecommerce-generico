import { IProduct } from "@/types/resources/product-type";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import Link from "next/link";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinary/cloudinary-loader";

export const ProductCard = ({ product }: { product: IProduct }) => {
  const imageSrc =
    product.imageUrls?.[0] ??
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  const outOfStock = product.stock === 0;
  const slug = slugify(product.name);

  return (
    <Link
      href={`/home/producto/${slug}?id=${product.id}`}
      className="group block h-full"
    >
      <div
        className={cn(
          "relative h-full flex flex-col overflow-hidden rounded-2xl bg-white",
          "border border-neutral-100 shadow-sm",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-200",
          "mx-auto w-full max-w-[150px] sm:max-w-[150px] lg:max-w-[170px] xl:max-w-[200px]",
          outOfStock && "opacity-60",
        )}
      >
        {/* Image */}
        <div className="relative w-full aspect-square bg-neutral-50 overflow-hidden">
          <Image
            src={imageSrc}
            fill
            alt={product.name}
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 170px, 200px"
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loader={cloudinaryLoader}
          />

          {outOfStock && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-medium text-xs px-3 py-1 rounded-full border border-white/40">
                Sin stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 justify-between gap-1.5 px-3 py-2.5">
          <h3 className="text-xs font-medium text-neutral-700 line-clamp-2 leading-snug group-hover:text-neutral-900 transition-colors duration-200">
            {product.name}
          </h3>

          <p className="text-sm font-semibold text-neutral-900 tracking-tight">
            ${product.price.toLocaleString("es-AR")}
          </p>
        </div>
      </div>
    </Link>
  );
};