import { IOrder } from "@/types/resources/order-types";

export default function OrderProductsList({ order }: { order: IOrder }) {
  const products = order.products;
  console.log("as", order)
  if (products) return (
    <div className="space-y-2">
      {products.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-md border p-2"
        >
          <div className="flex-1">
            <p className="text-xs font-medium">{item.productName}</p>

            <p className="text-xs text-muted-foreground">
              ${item.unitPrice} x {item.quantity}
            </p>
          </div>

          <div className="text-xs font-medium">${item.subtotal}</div>
        </div>
      ))}

      <p className="pt-1 text-xs text-muted-foreground">
        Productos: {order.products.length}
      </p>
    </div>
  );
}
