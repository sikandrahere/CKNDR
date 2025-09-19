import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '@/store/slices/cartSlice';

export const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const userId=localStorage.getItem("token")

useEffect(() => {
  dispatch(clearCart(userId)); // Clear the cart after order confirmation
}, [dispatch, userId]);
  const handleViewOrder = () => {
    navigate('/user/profile'); // Replace '/user-order' with your actual route
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4">Your order is confirmed</h1>
      <button 
        onClick={handleViewOrder} 
        className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-black transition-all"
      >
        View Order
      </button>
    </div>
  );
};

export default OrderConfirmationPage;