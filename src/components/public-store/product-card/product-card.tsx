import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

type Product = {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  imageUrls?: string[];
};

export const ProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const imageSrc =
    product.imageUrls?.[0] ??
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    if (quantity < product.stock) setQuantity((q) => q + 1);
  };

  const handleSub = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <Card
      className={`
        relative flex flex-col rounded-xl overflow-hidden p-0 pb-2 m-0 bg-white 
        shadow-sm border transition-all
        h-[350px] sm:h-[380px]
        ${outOfStock ? "opacity-60" : "hover:shadow-md hover:border-primary/30"}
      `}
    >
      {/* Imagen: misma proporción SIEMPRE */}
      <div className="relative w-full h-[55%] bg-gray-100">
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

      {/* Contenido */}
      <CardContent className="flex flex-col items-center justify-between p-4 h-[45%]">
        <div className="flex flex-col items-center text-center space-y-1">
          {/* Nombre */}
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Precio */}
          <p className="text-lg font-bold text-primary tracking-tight">
            ${product.price}
          </p>
        </div>

        {/* Counter elegante */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7 rounded-md"
            disabled={outOfStock || quantity <= 1}
            onClick={handleSub}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium w-6 text-center">
            {outOfStock ? 0 : quantity}
          </span>

          <Button
            size="icon"
            className="h-7 w-7 rounded-md bg-primary text-white hover:bg-primary/90"
            disabled={outOfStock || quantity >= product.stock}
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="w-full rounded-md bg-primary text-white hover:bg-primary/90 mt-2"
          disabled={outOfStock || quantity >= product.stock}
          onClick={() => {}}
        >
          Agregar al {<ShoppingCart />}
        </Button>
      </CardContent>
    </Card>
  );
};
