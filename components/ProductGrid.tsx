"use client";
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";

// Code for displaying a grid of products
// This component will display a grid of products. It will take an array of products as a prop and map over them to display a ProductThumb component for each product. The ProductThumb component will be responsible for displaying the product details and linking to the product page.
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {products?.map((product) => {
            return (
                <AnimatePresence key={product._id}>
                    <motion.div
                        layout  
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center"
                    >
                        <ProductThumb key={product._id} product={product} />
                    </motion.div>
                </AnimatePresence>
            );
        })}
    </div>
  );
}

export default ProductGrid;