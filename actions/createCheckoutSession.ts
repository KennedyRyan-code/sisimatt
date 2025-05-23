"use server"

import { CartItem } from "@/store/store";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

export type GroupedCartItem = {
    product: CartItem["product"];
    quantity: number;
}

export async function createCheckoutSession(
    items: GroupedCartItem[],
    metadata: Metadata
) {
    try {
        // check if any grouped items dont have a price
        const itemsWithoutPrice = items.filter(item => !item.product.price);
        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price");
        }
    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw new Error("Failed to create checkout session");
        
    }
}