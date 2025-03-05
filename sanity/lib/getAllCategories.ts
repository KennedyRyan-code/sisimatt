import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";


export const getAllCategories = async () => {
    const ALL_CATEGORIES_QUERY = defineQuery(`
        *[_type == "category"] | order(name asc) // Fetch all categories Query data GROQ
        `);
    
    try {
        // use sanityFetch send the query & get the data
        const categories = await sanityFetch({
            query: ALL_CATEGORIES_QUERY
        });
        // return the data(list os categories or an empty array)
        return categories.data || [];
    } catch (error) {
        console.error("Error fetching all categories:"), error;
        return [];
    }
}
