import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./Reducers/User";

const rootReducer = {
    user: userReducers
}

export const store = configureStore({
    reducer: rootReducer
});