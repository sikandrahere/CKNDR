import Order from "../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";

const getAllOrdersByAllusers=asyncHandler(async(req,res)=>{
    try {
        const orders = await Order.find({});
        if (!orders || orders.length === 0) {
            return res.status(404).json(new apiError(404, null, "No orders found"));
        }

        return res.status(200).json(new apiResponse(200, orders, "Orders retrieved successfully"));
        
    } catch (error) {
        console.error("Error in getAllOrdersByUser:", error);
        return res.status(500).json(new apiError(500, null, "Server error while retrieving orders"));
        
    }
})

  
  const updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { orderStatus } = req.body;
  
      const order = await Order.findById(orderId);
  
      if (!order) {
       return res.status(404).json(
         new apiError(404, null, "Order not found")
        )}
  
      await Order.findByIdAndUpdate(orderId, { orderStatus });
  
      res.status(200).json(
        new apiResponse(200, order, "Order status updated successfully"),);
    } catch (error) {
      console.error("Error in updateOrderStatus:", error);
      return res.status(500).json(
        new apiError(500, null, "Server error while updating order status"),
      );
    }
  };

export {getAllOrdersByAllusers,updateOrderStatus}