import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/sanity.types";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => CartItem[];
    getTotalPrice: () => number;
    getTotalItems: () => number;
    isEmpty: () => boolean;
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.product._id === product._id);
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.product._id === product._id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    } else {
                        return { items: [...state.items, { product, quantity: 1 }] };
                    }
                });
            },
            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.reduce((acc, item) => {
                        if (item.product._id === productId) {
                            if (item.quantity > 1) {
                                acc.push({ ...item, quantity: item.quantity - 1 });
                            }
                        } else {
                            acc.push(item);
                        }
                        return acc;
                    }
                    , [] as CartItem[]),
                }));
            },
            clearCart: () => set({ items: [] }),
            getItemCount: (productId) => {
                const item = get().items.find((item) => item.product._id === productId);
                return item ? item.quantity : 0;
            },
            getTotalPrice: () => {
                return get().items.reduce((total, item) => 
                     total + (item.product.price ?? 0) * item.quantity, 0);
            },
            getTotalItems: () => {
                return get().items.reduce((total, item) => {
                    return total + item.quantity;
                }, 0);
            },
            isEmpty: () => {
                return get().items.length === 0;
            },
            getGroupedItems: () => get().items,
                }),
        {
                name: "cart-storage", // unique name for the storage (must be unique across all stores)
                // getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
                // serialize: (state) => JSON.stringify(state), // (optional) custom serialization function;
                // deserialize: (str) => JSON.parse(str), // (optional) custom deserialization function;

        }
    )
);

export default useCartStore;