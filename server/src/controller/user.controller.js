import asyncHandler from "../../utils/asyncHandler.js";
import User from "../models/user.model.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new apiError(404, "User not found");
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error); // Log the error
        throw new apiError(500, "Something went wrong while generating tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name|| !email || !password) {
        console.log("all field is required")
    }

    const existedUser = await User.findOne(
        {
            $or: [{ email }]
        }
    )
    if (existedUser) {
        throw new apiError(409, "User already exits")
    }
    const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
    const user = await User.create({
        name,
        email,
        password,
        role
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user")
    }
    return res.status(200).json(
        new apiResponse(202, createdUser, "User registered Successfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!password && !email) {
        throw new apiError(400, "email and password is required")
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new apiError(404, "user not found")
    }

    const isPasswordRight = await user.isPasswordCorrect(password)
    if (!isPasswordRight) {
        throw new apiError(401, "Password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    let options = {
        httpOnly: true,
        secure: process.env.PORT === 'production',
    };


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully")

        );

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );
    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new apiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new apiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new apiError(401, "Unauthorized request");
        }
        if (incomingRefreshToken !== user.refreshToken) {
            throw new apiError(401, "Refresh token is expired or used");
        }
        const options = {
            httpOnly: true,
            secure: true
        };
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new apiResponse(
                    200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed")
            );
    } catch (error) {
        throw new apiError(401, error.message || "Invalid refresh token");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                req.user,
                "User fetched successfully"
            )

        )
})


export { registerUser, loginUser, logoutUser, refreshAccessToken, getUserProfile }