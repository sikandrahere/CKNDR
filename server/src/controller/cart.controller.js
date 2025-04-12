import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";

const addToCart = asyncHandler(async (req, res) => {
    const { size, productId, quantity, userId } = req.body;

    // Validate input fields
    if (!productId || !size || !quantity || !userId) {
        throw new apiError(400, "All fields are required");
    }

    try {
        // Fetch the product using its ID
        const product = await Product.findById(productId);
        if (!product) {
            throw new apiError(404, "Product not found");
        }

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        // If no cart exists, create a new one with the product
        if (!cart) {
            const newCart = new Cart({
                userId,
                products: [
                    {
                        productId: product._id, // Save the actual product ID
                        quantity: quantity,    // Use the provided quantity
                        size: size,            // Use the provided size
                    },
                ],
            });
            await newCart.save();

            // Populate products for proper response
            await newCart.populate({
                path: "products.productId",
                select: "name price image category size gender type",
            });

            return res.status(201).json(
                new apiResponse(
                    201,
                    newCart,
                    "Product added to cart successfully"
                )
            );
        }

        // Check if the product already exists in the cart
        const existingProduct = cart.products.find(
            (item) => item.productId.toString() === product._id.toString()
        );

        if (existingProduct) {
            // Increment quantity if the product exists
            existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(quantity);
        } else {
            // Add the new product to the cart
            cart.products.push({
                productId: product._id,
                quantity: quantity,
                size: size,
            });
        }

        // Save the updated cart
        await cart.save();

        // Populate products for proper response
        await cart.populate({
            path: "products.productId",
            select: "name price image category size gender type",
        });

        return res.status(200).json(
            new apiResponse(
                200,
                cart,
                "Product added to cart successfully"
            )
        );
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw new apiError(500, "Server error, failed to add product to cart");
    }
});

const fetchCartProducts = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json(new apiResponse(400, null, "User id is required"));
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "products.productId",
            select: "name price image category size gender type"
        });

        if (!cart) {
            return res.status(404).json(new apiResponse(404, null, "Cart not found"));
        }

        const validProducts = cart.products.filter((item) => item.productId);
        if (validProducts.length < cart.products.length) {
            cart.products = validProducts;
            await cart.save();
        }

        const populateCartProducts = validProducts.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            size: item.size,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            category: item.productId.category,
            gender: item.productId.gender,
            type: item.productId.type,
        }));

        return res.status(200).json(new apiResponse(200, {
            cartId: cart._id, // Include cartId in the response
            products: populateCartProducts
        }, "Cart fetched successfully"));
    } catch (error) {
        console.error("Error fetching cart products:", error);
        throw new apiError(500, "Server error, failed to fetch cart products");
    }
});

const editCartProduct = asyncHandler(async (req, res) => {
    const { productId, quantity, size, userId } = req.body;
    if (!productId || !quantity || !size || !userId) {
        return res.status(400).json(new apiResponse(400, null, "All fields are required"));
    }
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json(new apiResponse(404, null, "Cart not found"));
        }
        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json(new apiResponse(404, null, "Product not found in cart"));
        }
        product.quantity = quantity;
        product.size = size;
        await cart.save();

        await cart.populate({
            path: "products.productId",
            select: "image name price salePrice category size gender type",
        });

        const populateCartProducts = cart.products.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            size: item.size,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            category: item.productId.category,
            gender: item.productId.gender,
            type: item.productId.type,
        }))

        return res.status(200).json(new apiResponse(200, populateCartProducts, "Product quantity updated successfully"));
    } catch (error) {
        console.error("Error updating cart product:", error);
        throw new apiError(500, "Server error, failed to update cart product");
    }
})

const deleteCartProduct = asyncHandler(async (req, res) => {
    const { productId, userId } = req.params;
    if (!productId || !userId) {
        return res.status(400).json(new apiResponse(400, null, "can't get values from params"));
    }
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json(new apiResponse(404, null, "Cart not found"));
        }
        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json(new apiResponse(404, null, "Product not found in cart"));
        }
        cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
        await cart.save();
        await cart.populate({
            path: "products.productId",
            select: "image name price salePrice category size gender type",
        })
        const populateCartProducts = cart.products.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            size: item.size,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            category: item.productId.category,
            gender: item.productId.gender,
            type: item.productId.type,
        }))
        return res.status(200).json(new apiResponse(200, populateCartProducts, "Product deleted from cart successfully"));
    } catch (error) {
        console.error("Error deleting cart product:", error);
        throw new apiError(500, "Server error, failed to delete cart product");
    }
})
const clearCart = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json(new apiResponse(404, null, "Cart not found"));
        }

        // Delete the cart
        await Cart.findByIdAndDelete(cart._id);

        return res.status(200).json(new apiResponse(200, null, "Cart cleared successfully"));
    } catch (error) {
        console.error("Error in clearCart:", error);
        return res.status(500).json(new apiResponse(500, null, "Server error, failed to clear cart"));
    }
});

export { addToCart, fetchCartProducts, editCartProduct, deleteCartProduct, clearCart };