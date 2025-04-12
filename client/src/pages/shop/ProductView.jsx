import React, { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductDetails } from "@/store/slices/productSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { size } from "@/components/allFiles";
import { addToCart, fetchCartProducts } from "@/store/slices/cartSlice";
import { Toaster, toast } from "sonner";
import { addToFavourite, fetchFavouriteProducts } from "@/store/slices/favouriteSlice";

const ProductView = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const id = searchParams.get("id");
  const { productDetails, isLoading } = useSelector((state) => state.product);
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const userId = localStorage.getItem("token");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  // Memoized handleAddToCart
  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart!");
      return;
    }
    if (selectedSize !== productDetails.size) {
      toast.error("Size not available");
      return;
    }

    const existingProduct = cartProducts.find(
      (item) =>
        item.productId === productDetails._id && item.size === selectedSize
    );

    const totalQuantity = existingProduct
      ? existingProduct.quantity + 1
      : 1;

    if (totalQuantity > productDetails.totalStock) {
      toast.error(
        `Only ${productDetails.totalStock} items are available in stock!`
      );
      return;
    }

    const data = {
      productId: productDetails?._id,
      userId: userId,
      size: selectedSize,
      quantity: 1,
    };

    dispatch(addToCart(data))
      .then((response) => {
        if (response?.payload?.success) {
          toast.success("Product added to cart successfully!");
          dispatch(fetchCartProducts(userId));
        } else if (response?.payload?.message) {
          toast.error(response.payload.message);
        } else {
          toast.error("Failed to add product to cart.");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "An error occurred.");
        console.error(error);
      });
  }, [selectedSize, productDetails, cartProducts, dispatch, userId]);

  const handleAddToFavourite = useCallback(() => {
    const existingProduct = cartProducts.find(
      (item) =>
        item.productId === productDetails._id
    );
    if (existingProduct) {
      toast.error("Product already added to favourite");
      return;
    }

    const data = {
      productId: productDetails?._id,
      userId: userId,
    };

    dispatch(addToFavourite(data))
      .then((response) => {
        if (response?.payload?.success) {
          toast.success("Product added to favourite successfully!");
          dispatch(fetchFavouriteProducts(userId));
        } else if (response?.payload?.message) {
          toast.error(response.payload.message);
        } else {
          toast.error("Failed to add product to favourite.");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "An error occurred.");
        console.error(error);
      });
  }, [productDetails, dispatch, userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton />
      </div>
    );
  }

  return (

    <div className="container mx-auto p-5">
      <Toaster position="top-center" />
      {productDetails ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start m-10">
          <div className="flex flex-col items-center">
            <img
              src={productDetails.image}
              alt={`Image of ${productDetails?.name || "product"}`}
              className="h-[60vh] w-[100%] max-w-sm object-cover rounded-md hover:scale-105 transition-all duration-200 shadow-lg"
              loading="lazy"
            />
            <div className="mt-4 max-w-md w-full h-24 overflow-y-scroll border border-gray-300 p-3 rounded-md text-left">
              {productDetails?.description}
            </div>
          </div>
          <div className="space-y-5">
            <h1 className="text-4xl font-bold">
              {productDetails?.name || "Product Name"}
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              {productDetails?.category}
            </p>
            <div className="flex flex-wrap gap-3">
              {size?.length > 0 ? (
                size.map((sizeOption, index) => (
                  <div
                    key={index}
                    className={`border-2 ${selectedSize === sizeOption
                        ? "border-black"
                        : "border-gray-400"
                      } p-2 rounded-md cursor-pointer hover:bg-gray-200`}
                    onClick={() => setSelectedSize(sizeOption)}
                  >
                    {sizeOption}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No sizes available.</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-500 line-through">
                {productDetails?.price}
              </h1>
              <h1 className="text-3xl font-bold">
                {productDetails?.salePrice}
              </h1>
            </div>
            <div className="flex flex-col mt-10 gap-4">
              <Button
                className="w-[250px]"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                Add To Cart
              </Button>
              <Button
                className="w-[250px]"
                onClick={handleAddToFavourite}
              >
                Add To Favourite
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Product details not available.</p>
      )}
    </div>
  );
};

export default ProductView;