import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { login, register } from "./accountApi";
import LocalStore from "../../store/localStore";
import API_URL from "../../../config";

export const loginAccount = createAsyncThunk(
  "account/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const response = await login(API_URL, email, password);
      console.log(response, "login thunk");
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerAccount = createAsyncThunk(
  "account/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { name, email, password } = userData;
      const response = await register(API_URL, name, email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    name: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    token: null,
  },
  reducers: {
    logoutAccount(state) {
      state.name = null;
      state.isLoggedIn = false;
      LocalStore.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        console.log({ state }, "loading");
        console.log("loading");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        console.log({ state, action }, "fulfilled");
        state.loading = false;
        state.isLoggedIn = true;

        state.name = action.payload.payload.data.user.name;
        state.favorites = action.payload.payload.data.user.favorites;
        state.token = action.payload.payload.token;
        toast.success(action.payload.message);
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(registerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.name = action.payload.payload.name;
        state.token = action.payload.payload.token;
        toast.success(action.payload.message);
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { logoutAccount } = accountSlice.actions;

export default accountSlice.reducer;
