import { configureStore } from "@reduxjs/toolkit";
import receipeSliceReducer from "../features/receipeSlice";
export const store = configureStore({
    reducer: {
        receipe: receipeSliceReducer,
    },
});
