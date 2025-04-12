import Favourite from "../models/favourite.model.js";
import Product from "../models/product.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";

const addToFavourite = asyncHandler(async (req, res) => {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
        throw new apiError(400, "All fields are required");
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new apiError(404, "Product not found");
        }

    
        let favourite = await Favourite.findOne({ userId });

        if (!favourite) {
            const newFavourite = new Favourite({
                userId,
                products: [
                    {
                        productId: product._id
                    },
                ],
            });
            await newFavourite.save();


            await newFavourite.populate({
                path: "products.productId",
                select: "name image category type",
            });

            return res.status(201).json(
                new apiResponse(
                    201,
                    newCart,
                    "Product added to cart successfully"
                )
            );
        }

        const existingProduct =favourite.products.find(
            (item) => item.productId.toString() === product._id.toString()
        );

        if (existingProduct) {
            return res.status(400).json(new apiResponse(400, null, "Product already exists in favourite"));
            
        } else {
            favourite.products.push({
                productId: product._id,
            });
        }

        await favourite.save();

    
        await favourite.populate({
            path: "products.productId",
            select: "name image category type",
        });

        return res.status(200).json(
            new apiResponse(
                200,
                favourite,
                "Product added to favourite successfully"
            )
        );
    } catch (error) {
        console.error("Error adding product to favourite:", error);
        throw new apiError(500, "Server error, failed to add product to favourite");
    }
});

const fetchFavouriteProducts = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json(new apiResponse(400, null, "User id is required"));
        }
        const favourite = await Favourite.findOne({ userId }).populate({
            path: "products.productId",
            select: "name image category type"
        });
        if (!favourite) {
            return res.status(404).json(new apiResponse(404, null, "favourite not found"));
        }

        const validProducts = favourite.products.filter((item) => item.productId);
        if (validProducts.length < favourite.products.length) {
            favourite.products = validProducts;
            await favourite.save();
        }
        const populateCartProducts = validProducts.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            image: item.productId.image,
            category: item.productId.category,
            type: item.productId.type,
        })
        )

        return res.status(200).json(new apiResponse(200, populateCartProducts, "favourite fetched successfully"));
    } catch (error) {
        console.error("Error fetching favourite products:", error);
        throw new apiError(500, "Server error, failed to fetch favourite products");

    }


})

const deleteFavouriteProduct = asyncHandler(async (req, res) => {
    const { productId, userId } = req.params;
    if (!productId || !userId) {
        return res.status(400).json(new apiResponse(400, null, "can't get values from params"));
    }
    try {
        const favourite = await Favourite.findOne({ userId });
        if (!favourite) {
            return res.status(404).json(new apiResponse(404, null, "favourite not found"));
        }
        const product = favourite.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json(new apiResponse(404, null, "Product not found in favourite"));
        }
        favourite.products = favourite.products.filter((item) => item.productId.toString() !== productId);
        await favourite.save();
        await favourite.populate({
            path: "products.productId",
            select: "image name category  type",
        })
        const populateCartProducts = favourite.products.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            image: item.productId.image,
            category: item.productId.category,
            type: item.productId.type,
        }))
        return res.status(200).json(new apiResponse(200, populateCartProducts, "Product deleted from favourite successfully"));
    } catch (error) {
        console.error("Error deleting favourite product:", error);
        throw new apiError(500, "Server error, failed to delete favourite product");
    }
})

export { addToFavourite, fetchFavouriteProducts, deleteFavouriteProduct }