import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/imageUrl";

function ProductThumb({ product }: { product: Product }) {
    const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
    href={`/products/${product.slug?.current}`}
    className={`group flex flex-col bg-white rouunded-lg border border-gray-200 shadow-sm hover:shoadow-md transition-all duration-200 overflow-hidden
        ${isOutOfStock ? 'opacity-50' : ''}`}

    >
      <div className="relative  aspect-square w-full h-full overflow-hidden">
        {product.image && (
          <Image
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          src={imageUrl(product.image).url()}
          alt={product.name || "Product Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        )}
        {isOutOfStock && (
          <div className="flex item-center justify-center absolute bg-black bg-opacity-25 md:bg-opacity-50 inset-0">
            <span className="text-white text-lg font-semibold">Out of stock</span>
          </div>
      )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="mt-2 text-sm line-clamp-2 text-gray-600">
          {product.description
          ?.map((block) =>
            block._type== "block"
              ? block.children?.map((child) => child.text).join("")
              : ""
          )
          .join("") || "No description available"}
          </p>
          <div className="mt-2 text-lg font-boldtext-gray-gray-800">
            Ksh{product.price?.toFixed(2)}
          </div>
      </div>
    </Link>
  );
}

export default ProductThumb;