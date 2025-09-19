import js from "@eslint/js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_url=import.meta.env.VITE_API_URL

// Async thunk to register a new user
export const createUser = createAsyncThunk(
    "auth/createUser",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${api_url}/user/register`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures cookies are sent and received
        });
        return response.data; // The user data from the server
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Registration Failed" });
      }
    }
  );

// Async thunk to log in a user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${api_url}/user/login`,
          credentials,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // This ensures cookies are sent and received
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Login Failed" });
      }
    }
  );

// Async thunk to log out a user
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_url}/user/logout`,
        {},
        {
          withCredentials: true, // Ensures cookies are sent and deleted
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Logout Failed" });
    }
  });

  export const fetchUser = createAsyncThunk("auth/fetchUser", async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/user/profile`, {
        withCredentials: true, 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch user" });
    }
  });

// The auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload.data);
        localStorage.setItem("user", json.stringify(action.payload.data));
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // Handle logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
    // Handle fetchUser
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});


export default authSlice.reducer;