"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useCartStore } from "../stores/cart-store";
import { useProductById } from "@/features/admin/products/services/products-querys";

function CartTotalItem({
  productId,
  quantity,
  onSubtotal,
}: {
  productId: string;
  quantity: number;
  onSubtotal: (value: number) => void;
}) {
  //fetch the product
  const { data } = useProductById(productId);

  //if product exist calculate the subtotal and call the handleSubtotal fn to calculate the total, else ser the subtotal to 0
  useEffect(() => {
    if (data?.success) {
      onSubtotal(data.data.price * quantity);
    } else {
      onSubtotal(0);
    }
  }, [data, quantity, onSubtotal]);

  //return null because is an auxiliar comp
  return null;
}

export function CartTotal() {
  //get the items from the cart
  const items = useCartStore((s) => s.items);
  //create the total state
  const [total, setTotal] = useState(0);

  //useRef over useState because is not need the rerender per item
  const mapRef = useRef<Record<string, number>>({});

  //create the fn thah create record for the product using the id and set the subtotal + set the total
  const handleSubtotal = useCallback((id: string, value: number) => {
    //create the record + set subtotal
    mapRef.current[id] = value;

    //sum the subtotals from the ref
    const sum = Object.values(mapRef.current).reduce((a, b) => a + b, 0);

    //set the sum of subtotals as total
    setTotal(sum);
  }, []);

  //use useLayoutEffect for reset subtotals before children effects run, so each CartTotalItem can safely recalculate and report its subtotal when cart items change
  useLayoutEffect(() => {
    mapRef.current = {};
    setTotal(0);
  }, [items]);

  return (
    <>
      {/*Call the CartTotalItem auxiliar component for fetch the product for each item from the cart and calculate the subtotal + totla using the handleSubtotal fn*/}
      {items.map((i) => (
        <CartTotalItem
          key={i.productId}
          productId={i.productId}
          quantity={i.quantity}
          onSubtotal={(v) => handleSubtotal(i.productId, v)}
        />
      ))}

      <span className="text-lg font-semibold">
        ${total.toLocaleString("es-AR")}
      </span>
    </>
  );
}
