import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const searchProductsByName = async (queryParam: string) => {
    const PRODUCT_SERCH_QUERY = defineQuery(`
        *[_type == 'product' && name match $queryParam] | order(name asc)`)
    
    try {
      const products = await sanityFetch({
        query: PRODUCT_SERCH_QUERY,
        params: { queryParam: `${queryParam}*` // Add wildcard to search for partial matches

        }
      });
      return products.data || [];
    } catch (error) {
      console.error("Error fetching products by name:", error);
      return [];
    }
}