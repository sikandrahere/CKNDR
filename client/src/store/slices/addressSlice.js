import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_url=import.meta.env.VITE_API_URL

const initialState = {
    addresses: [],
    isLoading: false,
    error: null,
  };

  export const fetchAddresses = createAsyncThunk("address/fetchAddresses", async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/address/get/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch addresses" });

    }
  })

  export const createAddress = createAsyncThunk("address/createAddress", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api_url}/address/create`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to create address" });
    }
  })

  export const deleteAddress = createAsyncThunk("address/deleteAddress", async ({addressId, userId}, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${api_url}/address/delete/${userId}/${addressId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to delete address" });
    }
  })

  export const editAddress = createAsyncThunk("address/editAddress", async ({userId,addressId,data}, { rejectWithValue }) => {
      try {
         const response=await axios.put(`${api_url}/address/edit/${userId}/${addressId}`,data);
            return response.data;

      } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to edit address" });
            
      }
  }
)
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddresses.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchAddresses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addresses=action.payload.data;
        }).addCase(fetchAddresses.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
        .addCase(createAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(createAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addresses=[...state.addresses,action.payload.data];
        }).addCase(createAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
        .addCase(deleteAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(deleteAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            const {addressId}=action.payload.data
            const updatedAddresses=state.addresses.filter((address)=>address._id!==addressId);
            state.addresses=updatedAddresses
        }).addCase(deleteAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
    }
})
export default addressSlice.reducer;