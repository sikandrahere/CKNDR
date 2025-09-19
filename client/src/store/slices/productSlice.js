import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_url=import.meta.env.VITE_API_URL

// Async thunk for creating a product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_url}/admin/create-product`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

// Async thunk for editing a product
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${api_url}/admin/edit-product/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${api_url}/admin/delete-product/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

// Async thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${api_url}/admin/fetch-all-products`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

// Async thunk for fetching product details
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${api_url}/product/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

// Create the product slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [], // For storing all products
    productDetails: null, // For storing details of a single product
    status: "idle", // Track the status of the requests
    isLoading: false, // Track loading state
    error: null, // For handling errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      })

      // Get product details
      .addCase(getProductDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload.data; 
        state.isLoading = false;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;