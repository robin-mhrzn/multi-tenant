import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  userData: any;
  authToken: string | undefined;
}

const initialState: InitialState = {
  userData: localStorage.getItem("userData") || "{}",
  authToken: localStorage.getItem("authToken") || undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    storeUserData: (state, action: any) => {
      localStorage.setItem("userData", JSON?.stringify(action?.payload));
      state.userData = action?.payload;
    },
    storeAuthToken: (state, action: any) => {
      localStorage.setItem("authToken", action?.payload);
      state.authToken = action?.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.userData = {};
      state.authToken = undefined;
    },
  },
});

export const { storeUserData, storeAuthToken, logout } = profileSlice.actions;

export default profileSlice.reducer;
