import { getAllSalesByCouponCode } from "@/sanity/sales/getAllSalesByCouponCode";

async function BlackFridayBanner() {
  const sale = await getAllSalesByCouponCode('AprilFsale');
  if(!sale?.isActive) return null;
  
  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white p-10 py-16 mx-6 mt-4 rounded-lg shadow-lg">
      BlackFridayBanner
      </div>
  )
}

export default BlackFridayBanner