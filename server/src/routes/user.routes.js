import { Router } from "express";
import { 
    getUserProfile, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser 
} from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/refresh-token').post(refreshAccessToken);

// Authenticated routes
router.route('/logout').post(authMiddleware(), logoutUser);
router.route('/profile').get(authMiddleware(), getUserProfile);

export default router;