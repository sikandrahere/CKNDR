import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orderId: null,
    orders: [],
    isLoading: false,
    error: null,
  };

  const api_url=import.meta.env.VITE_API_URL
 export const createOrder = createAsyncThunk("order/createOrder", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${api_url}/user-order/create-order`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to create order" });
    }
  })

  export const verifyPayment = createAsyncThunk("order/verifyPayment", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${api_url}/user-order/verify-order`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to verify payment" });
    }
  })

  export const getAllOrdersByUser = createAsyncThunk("order/getAllOrdersByUser", async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${api_url}/user-order/list/${userId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to fetch orders" });  

    }  
    })



const userOrderSlice = createSlice({
    name: "userOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderId = action.payload.data;
        }).addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        }).addCase(verifyPayment.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(verifyPayment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.data;
        }).addCase(verifyPayment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        }).addCase(getAllOrdersByUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(getAllOrdersByUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.data;
        }).addCase(getAllOrdersByUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
    }
});

export default userOrderSlice.reducer;