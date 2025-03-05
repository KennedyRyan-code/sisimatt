import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
    return (
        <div className="flex flex-col">
            {/* categories */}
            <div className="w-full sm:w-[200px]">
                {/* <CategortySelectionComponent categories={categories} /> */}
            </div>
            {/* products */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <ProductGrid products={products} />

                    <hr className="w-1/2 sm:w-3/4 my-4" />
                </div>
            </div>
        </div>
    );
};

export default ProductsView;