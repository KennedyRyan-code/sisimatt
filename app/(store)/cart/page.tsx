'use client'

import AddToCartButton from "@/components/AddToCartButton";
import useCartStore from "@/store/store"
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



function CartPage() {
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const { user } = useUser();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your cart</h1>
                <p className="text-lg text-gray-600">Your cart is empty</p>
            </div>
        )
    }

    console.log("groupedItems", groupedItems);
  return (
    <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your cart</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-grow">
                {groupedItems?.map((item) => (
                    <div key={item.product._id} className="mb-4 p-4 border rounded flex item-center justify-between">
                        <div>{item.product.name}</div>
                        <div className="flex items-center ml-4 flex-shrink-0">
                            <AddToCartButton product={item.product}/>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CartPage;