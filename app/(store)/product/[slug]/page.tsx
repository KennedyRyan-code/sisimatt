import { imageUrl } from '@/sanity/lib/imageUrl';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { PortableText } from 'next-sanity';


async function ProductPage({ params, }: { params: Promise<{ slug: string }>; }) { // Add type for params
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg
                ${isOutOfStock ? 'opacity-50' : ''}`}
                >
                    {product.image && (
                        <Image
                            src={imageUrl(product.image).url()}
                            alt={product.name ?? 'Product image'}
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='object-contained transition-transform duration-300 hover:scale-105'
                    />
                    )}
                    {isOutOfStock && (
                        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
                            <span className='text-white text-2xl font-bold'>Out of stock</span>
                        </div>
                    )}
            </div>
            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>{product.name}</h1>
                    <div className='text-xl font-semibold mb-4'>Ksh{product.price?.toFixed(2)}</div>
                </div>
                <div className='prose max-w-none mb-6'>
                    {Array.isArray(product.description) &&(
                        <PortableText value={product.description} />
                    )}
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ProductPage;