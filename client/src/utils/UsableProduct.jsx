import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UsableProduct = ({ product }) => {
    const navigate = useNavigate();

    if (!product || !product.image || !product.name || !product.category) {
        return (
            <div className="flex items-center justify-center h-[60vh] w-[250px] bg-gray-200 rounded-md">
                <Skeleton />
            </div>
        );
    }

    return (
        <figure className="shrink-0" >
            <div onClick={ () => navigate(`/product/id?id=${product._id}`)}>
                <div className="overflow-hidden rounded-md hover:scale-103 transition-all duration-100">
                    <img
                        src={product.image}
                        alt="Product Image"
                        className="aspect-[3/4] h-[70vh] w-[350px] object-cover"
                        loading="lazy"
                    />
                </div>
                <div>
                    <h1 className="mt-2 text-lg font-bold text-gray-900">
                        {product.name}
                    </h1>
                    <h3 className="text-sm text-black">
                        {product.category}
                    </h3>
                    <h3 className="text-m text-gray-700">
                        Buy Now
                    </h3>
                </div>
            </div>
        </figure>
    );
};

export default UsableProduct;