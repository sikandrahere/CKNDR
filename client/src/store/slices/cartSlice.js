import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartId: null,
  cartProducts: [],
  cartCount: 0,
  isLoading: false,
  error: null,
};

const api_url=import.meta.env.VITE_API_URL
export const addToCart = createAsyncThunk("cart/addToCart", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_url}/cart/add`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Failed to add to cart" });
  }
});

export const fetchCartProducts = createAsyncThunk("cart/fetchCartProducts", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_url}/cart/get/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Failed to fetch cart products" });
  }
})
export const editCartProduct = createAsyncThunk("cart/editCartProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${api_url}/cart/edit`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Failed to edit cart product" });
  }
})

export const deleteCartProduct = createAsyncThunk("cart/deleteCartProduct", async ({ productId, userId }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_url}/cart/delete/${productId}/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Failed to delete cart product" });
  }
})
export const clearCart = createAsyncThunk("cart/clearCart", async (userId, { rejectWithValue }) => {
  try {
      const response = await axios.delete(`${api_url}/cart/clear/${userId}`);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to clear cart" });
  }
})
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartProducts = action.payload.data;
    }).addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    })
      .addCase(fetchCartProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }).addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartProducts = action.payload.data.products;
        state.cartCount = state.cartProducts.length
        state.cartId = action.payload.data.cartId
      }).addCase(fetchCartProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(editCartProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }).addCase(editCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartProducts = action.payload.data
      }).addCase(editCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }).addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartProducts = action.payload.data
      }).addCase(deleteCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      }).addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    }).addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartId = null;
        state.cartProducts = [];
        state.cartCount = 0;
    }).addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
    })
  },

});

export default cartSlice.reducer;