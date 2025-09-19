import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [],
    isLoading: false,
  };

  const api_url=import.meta.env.VITE_API_URL
  export const getAllOrdersByAllusers = createAsyncThunk("order/getAllOrdersByAllusers", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/admin-order/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch orders" });
    }
  });

  export const fetchOrderDetails = createAsyncThunk("order/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/admin-order/details/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch order details" });
    }
  });

  export const updateOrderStatus = createAsyncThunk("order/updateOrderStatus", async (data, { rejectWithValue }) => {
    const { orderId, orderStatus } = data;
    try {
      const response = await axios.put(`${api_url}/admin-order/update/${orderId}`, { orderStatus });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update order status" });
    }
  });

  export const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllOrdersByAllusers.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllOrdersByAllusers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orders = action.payload;
        })
        .addCase(updateOrderStatus.fulfilled, (state) => {
          state.orderDetails = null;
        });
    },
  });

  export default adminOrderSlice.reducer;