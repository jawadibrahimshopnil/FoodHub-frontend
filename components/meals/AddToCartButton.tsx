/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addToCart } from "@/helpers/cart.helper";
import { ShoppingBag } from "lucide-react";

interface Props {
  meal: Record<string, any>;
  className?: string;
  children?: React.ReactNode;
}

export default function AddToCartButton({ meal, className, children }: Props) {
  return (
    <button onClick={() => addToCart(meal)} className={className}>
      {children || (
        <>
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </>
      )}
    </button>
  );
}