import { CartProduct } from '@/components/allFiles';
import { fetchCartProducts } from '@/store/slices/cartSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('token'); // Retrieve user token from localStorage

  useEffect(() => {
    dispatch(fetchCartProducts(userId));
  }, [dispatch, userId]);

  const { cartProducts } = useSelector((state) => state.cart);

  // Calculate total items and total price
  const totalItems = cartProducts?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const totalPrice = cartProducts?.reduce((sum, item) => {
    const price = item?.price || 0;
    const quantity = item?.quantity || 0;
    return sum + quantity * price;
  }, 0) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-6 lg:px-8 h-screen">
      {cartProducts && cartProducts.length > 0 ? (
        <>
          {/* Cart Products Section */}
          <div className="space-y-4 overflow-y-auto h-full">
            {cartProducts.map((item) => (
              <div key={item}>
                <CartProduct cartProduct={item} />
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="flex flex-col items-start rounded-lg p-4 border border-gray-300 shadow-sm h-fit">
            {/* Total Items */}
            <div className="flex justify-between w-full mb-4 space-x-2">
              <p className="text-lg font-semibold text-gray-500 whitespace-nowrap">Total Items:</p>
              <p className="text-lg font-semibold text-black">{totalItems}</p>
            </div>

            {/* Total Price */}
            <div className="flex justify-between w-full mb-4 space-x-2">
              <p className="text-lg font-semibold text-gray-500 whitespace-nowrap">Total Price:</p>
              <p className="text-lg font-semibold text-black">₹ {totalPrice}</p>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={() => navigate('/products/checkout')}
              className="w-full lg:w-52 h-12 font-semibold text-xl rounded bg-black text-white mt-2 hover:bg-gray-800"
            >
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center  text-gray-600">Your cart is empty, please add some items</p>
      )}
    </div>
  );
};

export default Cart;