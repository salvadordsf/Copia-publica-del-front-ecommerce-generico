import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "@/types/resources/product-type";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import Link from "next/link";

export const ProductResultCard = ({ product }: { product: IProduct }) => {
  const imageSrc =
    product.imageUrls?.[0] ??
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const outOfStock = product.stock === 0;
  const slug = slugify(product.name);

  return (
    <Link
      href={`/home/producto/${slug}?id=${product.id}`}
      className="group block"
    >
      <Card
        className={cn(
          "block overflow-hidden rounded-sm bg-white",
          "border border-neutral-200 transition-all duration-200",
          "hover:shadow-md hover:border-neutral-300",
          "mx-auto w-full",
          "h-70 p-0 max-w-[150px] sm:max-w-[150px] lg:max-w-[170px] xl:max-w-[200px]",
          outOfStock && "opacity-60",
        )}
      >
        {/* Image */}
        <div className="relative w-full h-[70%] bg-gray-100">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {outOfStock && (
            <div className="absolute inset-0 bg-red-600/50 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-semibold text-sm px-4 py-1 rounded-md">
                SIN STOCK
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="flex flex-col px-2 justify-around h-[30%]">
          <h3 className="text-sm font-light text-gray-800 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          <p className="text-lg font-semibold text-primary tracking-tight self-center bg-green-200/70 px-2 mb-1  rounded-2xl">
            ${product.price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
