import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";


const CategoryPage = async (
    { params }: {
        params: Promise<{ slug: string }>
    }
) => {
    const { slug } = await params;
    const products = await getProductsByCategory(slug);
    const categories = await getAllCategories();
    // Check if products were found and return a 404 page if not
    if (!products) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Category not found</h1>
                <p className="text-gray-500">No products found for this category.</p>
            </div>
        );
    }
    // Check if categories were found and return a 404 page if not
    if (!categories) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Categories not found</h1>
                <p className="text-gray-500">No categories found.</p>
            </div>
        );
    }
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center">
                {slug
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                    Collection
            </h1>
            <ProductsView products={products} categories={categories} />

        </div>

    </div>
  )
}

export default CategoryPage