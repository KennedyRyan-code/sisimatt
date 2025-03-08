import { getAllSalesByCouponCode } from "@/sanity/sales/getAllSalesByCouponCode";

async function BlackFridayBanner() {
  const sale = await getAllSalesByCouponCode('AprilFsale');
  if(!sale?.isActive) return null;
  
  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white p-10 py-10 mx-6 mt-4 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
          {sale.title}
          </h2>
          <p className="text-left text-lg sm:text-xl font-semibold mb-6">
            {sale.description}
          </p>

          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 translate duration-300">
              <span className="font-bold text-base sm:text-lg">Use code:{" "}</span>
              <span className="text-red-600">{sale.couponCode}</span>
              <span className="ml-2 font-bold text-base sm:text-xl">for {sale.discountAmount}% OFF</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlackFridayBanner