import React, { memo, useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import { editCartProduct, fetchCartProducts, deleteCartProduct } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";

const CartProduct = memo(({ cartProduct }) => {
  const dispatch = useDispatch();

  const handleUpdateCartProduct = useCallback((cartProduct, typeOfOperation) => {
    const totalQuantity =
      typeOfOperation === "increment"
        ? cartProduct.quantity + 1
        : cartProduct.quantity - 1;

    // Validate total stock
    if (totalQuantity > cartProduct.totalStock) {
      alert(`Only ${cartProduct.totalStock} items are available in stock!`);
      return;
    }

    // Validate quantity does not drop below 1
    if (totalQuantity < 1) {
      alert("Quantity cannot be less than 1.");
      return;
    }

    // Prepare data to dispatch
    const data = {
      userId: localStorage.getItem("token"),
      productId: cartProduct.productId,
      size: cartProduct.size,
      quantity: totalQuantity,
    };


    // Dispatch Redux action
    dispatch(editCartProduct(data))
      .then((response) => {
        if (response?.payload?.success) {
          toast.success("Product quantity updated successfully.");
          dispatch(fetchCartProducts(localStorage.getItem("token")));
        } else if (response?.payload?.message) {
          toast.error(response.payload.message);
        } else {
          toast.error("Failed to update product quantity.");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred.");
        console.error(error);
      });
  }, [dispatch]);

  const handleDeleteCartProduct = useCallback((productId, userId) => {
    dispatch(deleteCartProduct({ productId, userId }))
      .then((response) => {
        if (response?.payload?.success) {
          toast.success("Product removed from cart successfully.");
          dispatch(fetchCartProducts(localStorage.getItem("token")));
        } else if (response?.payload?.message) {
          toast.error(response.payload.message);
        } else {
          toast.error("Failed to remove product from cart.");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred.");
        console.error(error);
      })
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row h-full m-5">
      <Toaster position="top-center" />
      {/* Product Display Section */}
      <div className="flex flex-col justify-between md:w-4/5">
        <div className="border border-gray-300 rounded-lg m-1.5">
          <div className="flex flex-col lg:flex-row justify-between items-center p-2.5">
            <div className="item-pic">
              <img
                className="w-52 object-cover rounded-lg m-1"
                src={cartProduct.image}
                alt={cartProduct.name}
              />
            </div>

            <div className="item-info text-center md:text-left">
              <p className="text-lg font-semibold">{cartProduct.name}</p>
              <p className="text-lg font-medium text-gray-500">
                {cartProduct.category}
              </p>
              <p className="text-lg font-semibold text-gray-500">
                Size: {cartProduct.size}
              </p>
            </div>

            <div className="item-price">
              <p className="text-lg font-semibold text-gray-900">
                MRP: ₹{cartProduct.price}
              </p>
            </div>
          </div>
          <div className="flex flex-col p-2.5">
            {/* Quantity Section */}
            <div className="flex items-center space-x-4">
              <Button
                className="bg-black text-white px-4 py-2 rounded"
                disabled={cartProduct.quantity === 1}
                onClick={() => handleUpdateCartProduct(cartProduct, "decrement")}
              >
                -
              </Button>
              <p className="text-lg font-semibold">
                Quantity: {cartProduct.quantity}
              </p>
              <Button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={() => handleUpdateCartProduct(cartProduct, "increment")}
              >
                +
              </Button>
            </div>

            <div className="text-lg font-semibold text-gray-400 cursor-pointer mt-3">
              <Button className="bg-black text-white px-4 py-2 rounded" onClick={() => handleDeleteCartProduct(cartProduct.productId, localStorage.getItem("token"))}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartProduct;