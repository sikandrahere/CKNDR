import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name: {
        type: String,
        required: true
    },
    flat: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
},{timestamps: true});

const Address = mongoose.model("Address", addressSchema);
export default Address;