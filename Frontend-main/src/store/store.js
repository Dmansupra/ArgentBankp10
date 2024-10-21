import { configureStore, createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload)
    },
  },
});

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    firstName: "",
    lastName: "",
    userName: "",
  },
  reducers: {
    setData: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
    },
  },
});

const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    userData: userDataSlice.reducer,
  },
});

const { setToken } = tokenSlice.actions;
const { setData } = userDataSlice.actions;

export { setToken, setData, store };
