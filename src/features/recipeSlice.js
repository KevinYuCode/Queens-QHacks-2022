import { createSlice } from "@reduxjs/toolkit";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
const initialState = {
  recipeDb: [],
  menu: [],
  cookingrecipe: {},
  inventory: [],
  ingredients: [],
  cookingrecipe: { ingredients: [], steps: [] },
  stockIngredients: [],
  usersIngredients: []
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,

  reducers: {
    setrecipeDb: (state, action) => {
      state.recipeDb = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setCookingrecipe: (state, action) => {
      state.cookingrecipe = action.payload;
    },
    setInventory: (state, action) => {
      state.inventory = action.payload;
    },
    setIngredients: (state, action) => {
      console.log(action.payload);
      state.ingredients = action.payload;
    },
    setCookingrecipe: (state, action) => {
      console.log(action.payload);
      state.cookingrecipe = action.payload;
    },
    setStockIngredients: (state, action) => {
      state.stockIngredients = action.payload;
    },
    setUsersIngredients: (state, action) => {
      console.log(action.payload);
      state.usersIngredients = action.payload;
    },
  },
});

export const {
  setUsersIngredients,
  setrecipeDb,
  setMenu,
  setCookingrecipe,
  setInventory,
  setIngredients,
  setStockIngredients,
} = recipeSlice.actions;

export const selectrecipeDb = (state) => state.recipe.recipeDb;
export const selectUsersIngredients = (state) => state.recipe.usersIngredients;
export const selectMenu = (state) => state.recipe.menu;
export const selectCookingrecipe = (state) => state.recipe.cookingrecipe;
export const selectInventory = (state) => state.recipe.inventory;
export const selectIngredients = (state) => state.recipe.ingredients;
export const selectStockIngredients = (state) => state.recipe.stockIngredients;
export default recipeSlice.reducer;
