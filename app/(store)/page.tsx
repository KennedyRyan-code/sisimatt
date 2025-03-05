import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/getAllCategories";
import { getAllProducts } from "@/sanity/lib/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div>
      <div className="flex flex-col justify-between justify-top min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
