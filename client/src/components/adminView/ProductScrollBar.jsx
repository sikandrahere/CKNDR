import React from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from '../ui/button';


const ProductScrollBarr = ({
  product,
  setOpenCreateProductsDialog,
  setFormData,
  setCurrentEditedId,
  handleDelete,
}) => {
  return (
    <div>
      <ScrollArea className="w-[90vw] whitespace-nowrap rounded-md relative z-[10]">
        <div className="flex w-max space-x-4 p-4">
          {product.map((product) => (
            <figure key={product._id} className="shrink-0">
              <div className="overflow-hidden rounded-md hover:scale-103 transition-all duration-100">
                <img
                  src={product.image}
                  alt="Product Image"
                  className="aspect-[3/4] h-[50vh] w-fit object-cover"
                  loading="lazy"
                  width={300}
                  height={400}
                />
              </div>
              <div>
                <h1 className="mt-2 text-lg font-bold text-gray-900">
                  {product.name}
                </h1>
                <h3 className="mt-1 text-m text-gray-700">{product.category}</h3>
              </div>
              <div className="mt-2 flex justify-around">
                {/* Ensure buttons are fully interactive */}
                <Button
                  variant="outline"
                  className="relative z-[20]"
                  onClick={() => {
                    setOpenCreateProductsDialog(true);
                    setFormData(product);
                    setCurrentEditedId(product._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="relative z-[20]"
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="relative z-[15]" />
      </ScrollArea>
    </div>
  );
};

export default ProductScrollBarr;