'use client'

import AddToCartButton from "@/components/AddToCartButton";
import { imageUrl } from "@/sanity/lib/imageUrl";
import useCartStore from "@/store/store"
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

function CartPage() {
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const { user } = useUser();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!groupedItems || groupedItems.length === 0) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center h-screen p-4 min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your cart</h1>
                <p className="text-lg text-gray-600">Your cart is empty</p>
            </div>
        )
    }
    const handleCheckout = async () => {
        if (!isSignedIn) return;
        setIsLoading(true);
        try {
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            }
            
        } catch (error) {
            
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your cart</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-grow">
                {groupedItems?.map((item) => (
                    <div key={item.product._id} className="mb-4 p-4 border rounded flex item-center justify-between">
                        <div className="flex items-center cursor-pointer flex-1 min-w-0"
                            onClick={() => router.push(`/product/${item.product.slug?.current}`)}>
                            
                            <div className="w-20 h-20 flex-shrink-0 mr-4 sm:h-24 sm:w-24">
                                {item.product.image && (
                                    <Image
                                        src={imageUrl(item.product.image).url()}
                                        alt={item.product.name ?? "product image"}
                                        className="w-full h-full object-cover rounded"
                                        width={96}
                                        height={96}
                                    />
                                )}
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg font-semibold sm:text-xl truncate">{item.product.name}</h2>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    Price: Kes{((item.product.price ?? 0) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
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