import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import apiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

// Middleware for authentication and optional role-based access
const authMiddleware = (requiredRole = null) =>
    asyncHandler(async (req, res, next) => {
        try {
            // Retrieve token from cookies or Authorization header
            const token =
                req.cookies?.accessToken ||
                req.header("Authorization")?.replace("Bearer ", "");

            if (!token) {
                throw new apiError(401, "Unauthorized: No access token provided.");
            }

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const user = await User.findById(decodedToken._id).select("-password -refreshToken");
            if (!user) {
                throw new apiError(401, "Invalid access token.");
            }

            req.user = user;

            if (requiredRole && (!user.role || user.role !== requiredRole)) {
                return res.status(403).json({
                    message: `Access denied: Requires ${requiredRole} privileges.`,
                });
            }

            next();
        } catch (error) {
            throw new apiError(401, error.message || "Invalid or expired access token.");
        }
    });

export default authMiddleware;

