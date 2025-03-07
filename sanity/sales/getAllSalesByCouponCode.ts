import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../lib/live";

export const getAllSalesByCouponCode = async (couponCode: CouponCode) => {
    const ACTIIVE_SALE_BY_COUPON_QUERY = defineQuery(`
        *[_type == "sale"
            && isActive == true
            && couponCode == $couponCode
            ] | order(validFrom desc) [0]
    `);

    try {
        const activeSale = await sanityFetch({
            query: ACTIIVE_SALE_BY_COUPON_QUERY,
            params: { couponCode }, // This is the variable that will be passed to the query
        });
        return activeSale ? activeSale.data : null;
    } catch (error) {
        console.error("Error fetching active sale by coupon code:", error);
        return null;
    }
};
