import asyncHandler from "../../utils/asyncHandler.js";
import Product from "../models/product.model.js";
import apiResponse from "../../utils/apiResponse.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import apiError from "../../utils/apiError.js";

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category,size,gender,type, totalStock, salePrice } = req.body;

    if (!name || !price || !description || !category || !size || !gender || !type || !totalStock || !salePrice) {
        throw new apiError(400, "All fields are required");
    }
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new apiError(400, "Image is required");
    }
    try {
        const ProductImage = await uploadOnCloudinary(imageLocalPath);
        if (!ProductImage) {
            throw new apiError(500, "Image upload failed");
        }
        const product = await Product.create({
            name,
            price,
            description,
            category,
            size,
            gender,
            type,
            image: ProductImage.url,
            totalStock,
            salePrice,
        });
        return res.status(201).json(new apiResponse(201, product, "Product created successfully"));
    } catch (error) {
        console.error("Error creating product:", error);
        throw new apiError(500, "Server error, failed to create product");
    }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(new apiResponse(200, products, "Products fetched successfully"));
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new apiError(500, "Server error, failed to fetch products");
    }
}
)

const getProductDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new apiError(404, "Product not found");
        }
        return res.status(200).json(new apiResponse(200, product, "Product details fetched successfully"));
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw new apiError(500, "Server error, failed to fetch product details");
    }
});

const editProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get product ID from URL parameters
    const updates = req.body; // Get updated product details from the request body

    try {
        // Validate if the product exists
        const product = await Product.findById(id);
        if (!product) {
            throw new apiError(404, "Product not found");
        }

        // Update product details
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated product
            runValidators: true, // Ensure validation rules are applied
        });

        return res.status(200).json(new apiResponse(200, updatedProduct, "Product updated successfully"));
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json(new apiResponse(500, null, "Failed to update product"));
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new apiError(404, "Product not found");
        }
        return res.status(200).json(new apiResponse(200, deletedProduct, "Product deleted successfully"));
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new apiError(500, "Server error, failed to delete product");
    }
});

export { createProduct, fetchAllProducts, editProduct, deleteProduct,getProductDetails };