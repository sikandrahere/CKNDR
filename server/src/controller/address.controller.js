import Address from "../models/address.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js"; 

const createAddress = asyncHandler(async (req, res) => {
    try {
         const { userId,name,flat,area,city,pincode,phone } = req.body;
         if (!userId ||!name || !flat || !area || !city || !pincode || !phone) {
             throw new apiError(400, "All fields are required");
         }
         const user = await User.findById(userId);
         if (!user) {
             throw new apiError(404, "User not found");
         }
         const newAddress = await Address.create({
                userId,
                name,
                flat,
                area,
                city,
                pincode,
                phone
         });
         return res.status(201).json(new apiResponse(201, newAddress, "Address created successfully"));
    } catch (error) {
        console.error("Error creating address:", error);
        throw new apiError(500, "Server error, failed to create address");    
    }
});

const fetchAddress = asyncHandler(async (req, res) => {
    try {
     const {userId} = req.params;
     if (!userId) {
         throw new apiError(400, "User id is required");
     }
     const user = await User.findById(userId);
     if (!user) {
         throw new apiError(404, "User not found");
     }
     const address = await Address.find({userId});
     return res.status(200).json(new apiResponse(200, address, "Address fetched successfully"));
    } catch (error) {
        console.error("Error fetching address:", error);
        throw new apiError(500, "Server error, failed to fetch address");
    }
});

const editAddress = asyncHandler(async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const { name, flat, area, city, pincode, phone } = req.body;

        // Validate input
        if (!userId || !addressId || !name || !flat || !area || !city || !pincode || !phone) {
            throw new apiError(400, "All fields are required");
        }

        const addressForUpdate = await Address.findOneAndUpdate(
            { _id: addressId, userId },
            { name, flat, area, city, pincode, phone },
            { new: true }
        );

        if (!addressForUpdate) {
            throw new apiError(404, "Address not found");
        }

        return res.status(200).json(new apiResponse(200, addressForUpdate, "Address updated successfully"));
    } catch (error) {
        console.error("Error updating address:", error);
        throw new apiError(500, "Server error, failed to update address");
    }
});
const deleteAddress = asyncHandler(async (req, res) => {
    try {
        const { userId,addressId } = req.params;
        if(!userId || !addressId) {
            throw new apiError(400, "All fields are required");
        }
        const addressForDelete= await Address.findOneAndDelete({_id:addressId,userId});
        if (!addressForDelete) {
            throw new apiError(404, "Address not found");
        }
        return res.status(200).json(new apiResponse(200, addressForDelete, "Address deleted successfully"));
    } catch (error) {
        console.error("Error deleting address:", error);
        throw new apiError(500, "Server error, failed to delete address");
    }
});

export { createAddress, fetchAddress, editAddress, deleteAddress };