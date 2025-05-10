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
  const itemCount = getItemCount(product._id);

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
      <button
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0 || disabled}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ease-in-out ${itemCount === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
        >

        <span className={`text-xl font-bold ${itemCount === 0 ? 'text-gray-400' : 'text-gray-500'}`}>
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
    </div>
  )
}

export default AddToCartButton;