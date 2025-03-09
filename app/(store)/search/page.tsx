import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({
    searchParams,
}: {
    searchParams: {
        query: string;
    };
}) {
    const { query } = await searchParams;
    const products = await searchProductsByName(query);

    if (!products.length) {
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md  w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">
                  No products found for "{query}"
                </h1>
                <p className="text-center text-gray-600">
                  Try searching for something else
                </p>
            </div>
          </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-top p-4 bg-gray-100 min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-2xl font-bold md-6 text-center">Search results for "{query}"</h1>
            <ProductGrid products={products} />
          </div>
        </div>
    )
}

export default SearchPage