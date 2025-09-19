import React, { useState, useEffect } from 'react';
import { fetchAddresses } from '@/store/slices/addressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchCartProducts } from '@/store/slices/cartSlice';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { createOrder, verifyPayment } from '@/store/slices/userOrderSlice.js';
import { LoadScript  } from '@/components/allFiles';

const RAZORPAY_KEY_ID=import.meta.env.VITE_RAZORPAY_KEY_ID

const Checkout = () => {
    const userId = localStorage.getItem("token");
    const { addresses } = useSelector((state) => state.address);
    const { cartId, cartProducts } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        if (userId) {
            dispatch(fetchAddresses(userId));
            dispatch(fetchCartProducts(userId));
        }
    }, [dispatch, userId]);
useEffect(()=>{
  LoadScript('https://checkout.razorpay.com/v1/checkout.js')
})
 

    const totalAmount = cartProducts.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0);

    const handlePaymentButton = () => {
        if (!selectedAddress) {
            toast.error("Please select an address.");
            return;
        }

        const { name, phone, city, pincode } = selectedAddress;
        if (!name || !phone || !city || !pincode) {
            toast.error("Selected address is incomplete. Please provide all required details.");
            return;
        }

        const orderData = {
            userId,
            cartId,
            cartProducts: cartProducts.map((product) => ({
                productId: product?.productId,
                name: product?.name,
                image: product?.image,
                price: product?.price,
                quantity: product?.quantity,
                size: product?.size,
            })),
            address: {
                addressId: selectedAddress?._id,
                name: selectedAddress?.name,
                flat: selectedAddress?.flat,
                area: selectedAddress?.area,
                city: selectedAddress?.city,
                pincode: selectedAddress?.pincode,
                phone: selectedAddress?.phone,
            },
            orderStatus: "pending",
            paymentMethod: "razorpay",
            paymentStatus: "pending",
            totalAmount,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: null,
        };

        dispatch(createOrder(orderData))
            .then((response) => {
                const { razorpayOrder } = response.payload.data;

                const options = {
                    key: RAZORPAY_KEY_ID,
                    amount: totalAmount * 100, // Amount in paisa
                    currency: "INR",
                    name: "Ecommerce",
                    description: "Payment for your order",
                    order_id: razorpayOrder.id, // Pass the order_id here
                    handler: (response) => {
                        console.log("Payment response:", response);



                        dispatch(verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id:response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }))
                            .then(() => {
                                toast.success("Payment verified successfully!");
                                navigate("/order/verify-order");
                            })
                            .catch((error) => {
                                toast.error("Payment verification failed. Please contact support.");
                                console.error("Verification error:", error);
                            });
                    },
                    prefill: {
                        name: selectedAddress.name,
                        email: selectedAddress.email || "test@example.com",
                        contact: selectedAddress.phone,
                    },
                    notes: {
                        address: `${selectedAddress.flat}, ${selectedAddress.area}, ${selectedAddress.city}`,
                    },
                    theme: {
                        color: "#528FF0",
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            })
            .catch((error) => {
                toast.error("Failed to place the order. Please try again.");
                console.error("Order creation error:", error);
            });
    };

    return (
        <div className="m-10">
            <Toaster position="top-center" />
            <div className="flex flex-wrap gap-5 w-full">
                {addresses && addresses.length > 0 ? (
                    addresses.map((address, index) => (
                        <Card
                            key={index}
                            className={`rounded-lg p-3 min-w-[300px] shadow-md hover:shadow-lg cursor-pointer ${selectedAddress === address ? "border-2 border-black" : "border border-gray-300"
                                }`}
                            onClick={() => setSelectedAddress(address)}
                        >
                            <CardContent className="gap-4">
                                <p>Name: {address.name}</p>
                                <p>Flat: {address.flat}</p>
                                <p>Area: {address.area}</p>
                                <p>City: {address.city}</p>
                                <p>Pincode: {address.pincode}</p>
                                <p>Phone: {address.phone}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>No addresses found, please add one</p>
                )}
            </div>
            <div>
                <Button className="m-5" onClick={handlePaymentButton}>
                    Continue to payment
                </Button>
            </div>
        </div>
    );
};

export default Checkout;