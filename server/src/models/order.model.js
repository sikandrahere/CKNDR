import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cartId: {
        type: String,
        required: true,
    },
    cartProducts: [
        {
            productId: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
    address: [
        {
            addressId: {
                type: String,
                required: true
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
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
        }
    ],
    orderStatus: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        required: true,
    },
    orderUpdateDate: {
        type: Date,
        required: true,
    },
    paymentId: {
        type: String
    }
}, {
    timestamps: true
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;