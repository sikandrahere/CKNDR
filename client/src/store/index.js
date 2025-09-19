import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productSlice.js"
import cartReducer from "./slices/cartSlice.js"
import favouriteReducer from "./slices/favouriteSlice.js"
import addressReducer from "./slices/addressSlice.js"
import userOrderReducer from "./slices/userOrderSlice.js"
import adminOrderReducer  from "./slices/adminOrderSlice.js";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        product:productReducer,
        cart:cartReducer,
        favourite:favouriteReducer,
        address:addressReducer,
        userOrder:userOrderReducer,
        adminOrder:adminOrderReducer
    }
})
export default store