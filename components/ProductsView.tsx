import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
    return (
        <div>
            {/* categories */}
            <div className="w-full sm:w-[200px]">
                {/* <CategortySelectionComponent categories={categories} /> */}
            </div>
            {/* products */}
            <div>
                <h2 className="text-2xl font-bold">All Products</h2>
                <div>
                    <ProductGrid products={products} />

                    <hr className="w-1/2 sm:w-3/4"/>
                </div>
            </div>
        </div>
    );
};

export default ProductsView;