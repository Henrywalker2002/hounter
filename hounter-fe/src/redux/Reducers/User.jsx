import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 0,
    username: "",
    fullName: "",
    email: "",
    avatar: "",
    role: [],
  },
  isLogin: false,
  token: "",
};

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    LOGIN: (
      state,
      { payload: { id,username, email, fullName, avatar, accessToken,roles } }
    ) => {
      state.user = {
        id: id,
        username: username,
        fullName: fullName,
        email: email,
        avatar: avatar,
        role: roles
      };
      state.isLogin = true;
      state.token = accessToken;
    },
    LOGOUT: (state) => {
      state.user = initialState.user;
      state.isLogin = false;
      state.token = "";
    },
    SETCOOKIES: (state, {payload: cookie}) => {
      state.user = {
        id: cookie.id,
        username: cookie.username,
        fullName: cookie.fullName,
        email: cookie.email,
        avatar: cookie.avatar,
        role: cookie.roles
      };
      state.isLogin = true;
      state.token = cookie.accessToken;
    },
    SET_AVATAR: (state, action) => {
      state.user.avatar = action.payload.avatar;
    }
  }

});

export const { LOGIN, LOGOUT, SETCOOKIES, SET_AVATAR} = slice.actions;

export const userReducers = slice.reducer;

