import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";


const CategoryPage = async (
    { params }: {
        params: Promise<{ slug: string }>
    }
) => {
    const slug = await params;
    const products = await getProductsByCategory(slug.slug);
    
  return (
    <div>CategoryPage</div>
  )
}

export default CategoryPage