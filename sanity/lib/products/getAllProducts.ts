import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
    const ALL_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product"] | order(name asc) // Fetch all products Query data GROQ
        `);
    
    try {
        // use sanityFetch send the query & get the data
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY
        });
        // return the data(list os products or an empty array)
        return products.data || [];
    } catch (error) {
        console.error("Error fetching all products:"), error;
        return [];
    }
}