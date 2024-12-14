import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js"
import { courseApi } from "../slices/api/courseApi.js";
import { authApi } from "../slices/api/authApi.js";
import { purchaseApi } from "../slices/api/purchaseApi.js";
import { courseProgressApi } from "../slices/api/courseProgressApi.js";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer, 
});
export default rootReducer;