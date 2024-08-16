import React from 'react'
import ProductBanner from './ProductBanner'

const ProductSection = () => {
  return (
    <div className="grid grid-cols-4 w-full gap-6">
        {Array.from({ length: 40 }, (_, i) => (
            <ProductBanner key={i} />
        ))}
    </div>
  )
}

export default ProductSection