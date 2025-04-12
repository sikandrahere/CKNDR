import React from 'react'
import { UsableProduct } from '../allFiles'
import { ScrollArea,ScrollBar } from '../ui/scroll-area'


const ShopProductScrollBar = ({product}) => {

  return (
    <div>
      <ScrollArea className="w-[90vw] whitespace-nowrap rounded-md relative z-[10]">
        <div className="flex w-max space-x-4 p-4">
          {product.map((product) => (
            <UsableProduct  key={product._id} product={product} />
          ))}
        </div>
        {/* Ensure scrollbar doesn't interfere */}
        <ScrollBar orientation="horizontal" className="relative z-[15]" />
      </ScrollArea>
    </div>
  )
}

export default ShopProductScrollBar;