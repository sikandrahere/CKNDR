import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    favouriteProducts: [],
    isLoading: false,
    error: null,
  };

  export const addToFavourite = createAsyncThunk("favourite/addToFavourite", async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://ckndr.onrender.com/favourite/add", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to add to favourite" });
    }
  });

  export const fetchFavouriteProducts = createAsyncThunk("favourite/fetchFavouriteProducts", async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://ckndr.onrender.com/favourite/get/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch favourite products" });
    }
  })
  

 export  const deleteFavouriteProduct = createAsyncThunk("favourite/deleteFavouriteProduct", async ({productId, userId}, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://ckndr.onrender.com/favourite/delete/${productId}/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to delete favourite product" });
    }
  })
const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToFavourite.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(addToFavourite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.favouriteProducts=action.payload.data;
        }).addCase(addToFavourite.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
        .addCase(fetchFavouriteProducts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(fetchFavouriteProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.favouriteProducts = action.payload.data;
        }).addCase(fetchFavouriteProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
        .addCase(deleteFavouriteProduct.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }).addCase(deleteFavouriteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.favouriteProducts = action.payload.data
        }).addCase(deleteFavouriteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        })
    },
        
  });
  
  export default favouriteSlice.reducer;
