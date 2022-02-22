import { configureStore } from "@reduxjs/toolkit";
import recipeSliceReducer from "../features/recipeSlice";
export const store = configureStore({
    reducer: {
        recipe: recipeSliceReducer,
    },
});
