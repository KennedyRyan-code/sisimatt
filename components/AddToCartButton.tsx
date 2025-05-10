"use client";
import { Product } from "@/sanity.types";
import useCartStore from "@/store/store";
import { get } from "http";
import { useEffect, useState } from "react";

interface AddToCartButtonProps {
    product: Product;
    disabled?: boolean;
}

function AddToCartButton({product, disabled }: AddToCartButtonProps) {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const ItemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);
  // use useEffect to set isClient to true after the component mounts
  // This is to ensure that the component only renders on the client side
  // and not on the server side preventing hydration errors
  useEffect(() => {
    setIsClient(true);
  } , []);
  // check if the component is mounted on the client side
  if (!isClient) {
    return null;
  }


  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="w-8 text-center font-semibold">{ItemCount}</span>
    </div>
  )
}

export default AddToCartButton;