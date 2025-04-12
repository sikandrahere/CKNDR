import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavouriteProduct, fetchFavouriteProducts } from '@/store/slices/favouriteSlice.js'
import { useParams } from 'react-router-dom'
import { ScrollBar, ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from "sonner";


const FavouriteProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams();
    useEffect(() => {
        dispatch(fetchFavouriteProducts(userId));
    }, [dispatch, userId]);

    const { favouriteProducts } = useSelector((state) => state.favourite);

    const handleDeleteFavouriteProduct = useCallback((productId, userId) => {
        dispatch(deleteFavouriteProduct({ productId, userId }))
          .then((response) => {
            if (response?.payload?.success) {
              toast.success("Product removed from Favourite successfully.");
              dispatch(fetchFavouriteProducts(userId));
            } else if (response?.payload?.message) {
              toast.error(response.payload.message);
            } else {
              toast.error("Failed to remove product from Favourite.");
            }
          })
          .catch((error) => {
            toast.error(error.response?.data?.message || "An error occurred.");
            console.error(error);
          })
      }, [dispatch]);
    return (
        <div >   
               <Toaster position="top-center" />
            {favouriteProducts && favouriteProducts.length > 0 ? (
                <div>
                    <ScrollArea className="w-[90vw] whitespace-nowrap rounded-md relative z-[10] ml-7">
                        <div className="flex w-max space-x-4 p-4">
                            {favouriteProducts.map((product) => (
                                <figure key={product.productId} className="shrink-0">
                                    <div className="overflow-hidden rounded-md hover:scale-103 transition-all duration-100" onClick={ () => navigate(`/product/id?id=${product.productId}`)}>
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
                                    <div >
                                       
                                        <Button
                                            variant="ghost"
                                            className="secondary"
                                            onClick={() => {
                                                handleDeleteFavouriteProduct(product.productId, userId);
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </figure>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="relative z-[15]" />
                    </ScrollArea>

                </div>
            ) : (
                <div className='ml-10'> <h1>No Favourite Products</h1></div>
            )}

        </div>
    )
}

export default FavouriteProduct