import Order from "../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";
import razorpayInstance from "../../utils/razorpay.js";
import crypto from "crypto";

// Create Order Controller
const createOrder = asyncHandler(async (req, res) => {
    try {
        const {
            userId,
            cartId,
            cartProducts,
            address,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
        } = req.body;

        // Validate required fields
        if (
            !userId ||
            !cartId ||
            !cartProducts ||
            !address ||
            !orderStatus ||
            !paymentMethod ||
            !paymentStatus ||
            !totalAmount ||
            !orderDate ||
            !orderUpdateDate
        ) {
            console.error("Missing required fields:", { userId, cartId, cartProducts, address, totalAmount });
            return res.status(400).json(new apiResponse(400, null, "All fields are required"));
        }

        // Create Razorpay Order
        const options = {
            amount: totalAmount * 100, // Amount in paisa
            currency: "INR",
            receipt: `receipt_${cartId}`,
            payment_capture: 1,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);
        if (!razorpayOrder) {
            throw new apiError(500, "Failed to create Razorpay order");
        }
        console.log("Razorpay order created:", razorpayOrder);

        // Save Order in Database
        console.log("Saving order to database...");
        const order = await Order.create({
            userId,
            cartId,
            cartProducts,
            address,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            paymentId: razorpayOrder.id, // Razorpay order ID
            orderDate,
            orderUpdateDate,
        });

        if (!order) {
            throw new apiError(500, "Failed to create order in the database");
        }

        return res.status(200).json(new apiResponse(200, { order, razorpayOrder }, "Order created successfully"));
    } catch (error) {
        console.error("Error in createOrder:", error);
        return res.status(500).json(new apiResponse(500, null, "Server error, failed to create order"));
    }
});

// Verify Payment Controller
const verifyPayment = asyncHandler(async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.error("Missing payment verification details");
            return res.status(400).json(new apiResponse(400, null, "Missing payment details"));
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            console.error("Payment verification failed: invalid signature");
            return res.status(400).json(new apiResponse(400, null, "Payment verification failed"));
        }
        const order = await Order.findOneAndUpdate(
            { paymentId: razorpay_order_id },
            { paymentStatus: "success", payerId: razorpay_payment_id },
            { new: true }
        );

        if (!order) {
            console.error("Order not found for payment verification");
            return res.status(404).json(new apiResponse(404, null, "Order not found"));
        }

        return res.status(200).json(new apiResponse(200, order, "Payment verified successfully"));
    } catch (error) {
        console.error("Error in verifyPayment:", error);
        return res.status(500).json(new apiResponse(500, null, "Server error during payment verification"));
    }
});

const getAllOrdersByUser=asyncHandler(async(req,res)=>{
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json(new apiResponse(400, null, "User ID is required"));
        }

        const orders = await Order.find({ userId });
        if (!orders || orders.length === 0) {
            return res.status(404).json(new apiResponse(404, null, "No orders found for this user"));
        }

        return res.status(200).json(new apiResponse(200, orders, "Orders retrieved successfully"));
        
    } catch (error) {
        console.error("Error in getAllOrdersByUser:", error);
        return res.status(500).json(new apiResponse(500, null, "Server error while retrieving orders"));
        
    }
})





export { createOrder, verifyPayment, getAllOrdersByUser };