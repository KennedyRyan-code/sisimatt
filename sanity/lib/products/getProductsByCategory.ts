import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[_type == 'product' && references(*[_type == 'category' && slug.current == $categorySlug]._id)] | order(name asc)`);

    try {
        // Fetch products by category slug
        // The query will return products that reference the category with the given slug
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: { categorySlug },
        });
        // Check if products were found and return them
        // If no products were found, return null
        return products.data || null;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return null;
    }
}