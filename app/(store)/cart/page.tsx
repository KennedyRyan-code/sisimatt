'use client'

import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import AddToCartButton from "@/components/AddToCartButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/sanity/lib/imageUrl";
import useCartStore from "@/store/store"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



function CartPage() {
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const { user } = useUser();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check if the component is mounted on the client side
    useEffect(() => {
        setIsClient(true);
    }
    , []);

    if (!isClient) {
        return <Loader />
    }

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
            const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
            if (typeof checkoutUrl === "string" && checkoutUrl) {
                window.location.href = checkoutUrl;
            }
            
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("Failed to create checkout session");
            
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
            <div className="w-full lg:w-88 lg:sticky lg:top-4 h-fit bg-white p-6 boarder rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                <h3 className="text-xl font-semibold">Order summary</h3>
                <div className="mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Items:</span>
                        <span>
                            {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                        </span>
                    </p>
                    <p className="flex justify-between text-2xl font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>
                            Kes {useCartStore.getState().getTotalPrice().toFixed(2)}
                        </span>
                    </p>
                </div>
                {isSignedIn ? (
                    <button
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className="mt-4 w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 disabled:bg-gray-400 transition duration-200"
                    >
                        {isLoading ? "Processing..." : "Checkout"}
                    </button>
                ) : (
                    <SignInButton mode="modal">
                        <button className="mt-4 w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition duration-200">
                            Sign in to checkout
                        </button>
                    </SignInButton>
                )}
            </div>
                    {/* spacer for fixed checkout on mobile */}
            <div className="h-64 lg:h-0">

            </div>
            
        </div>
    </div>
  )
}

export default CartPage;