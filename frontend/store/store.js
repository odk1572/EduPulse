import {configureStore} from "@reduxjs/toolkit" 
import rootReducer from "./rootReducer";
import { authApi } from "../slices/api/authApi";
import { courseApi } from "../slices/api/courseApi";
import { purchaseApi } from "../slices/api/purchaseApi";
import { courseProgressApi } from "../slices/api/courseProgressApi";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();