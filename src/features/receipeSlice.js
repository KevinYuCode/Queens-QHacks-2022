import { createSlice } from "@reduxjs/toolkit";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpeg";
import data from "../App";
import dishModal from "../components/dishModal";
const initialState = {
  receipeDb: [
    {
      name: "new word",
      image: image3,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
      ingredients: [],
      steps: [],
    },
  ],
  menu: [],
  cookingReceipe: {},
  inventory: [],
  ingredients: [],
  cookingReceipe: { ingredients: [], steps: [] },
  stockIngredients: [],
};

const receipeSlice = createSlice({
  name: "receipe",
  initialState,

  reducers: {
    setReceipeDb: (state, action) => {
      state.receipeDb = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setCookingReceipe: (state, action) => {
      console.log(action.payload);
      state.cookingReceipe = action.payload;
    },
    setInventory: (state, action) => {
      state.inventory = action.payload;
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setCookingReceipe: (state, action) => {
      console.log(action.payload);
      state.cookingReceipe = action.payload;
    },
    setStockIngredients: (state, action) => {
      state.stockIngredients = action.payload;
    },
  },
});

export const { setReceipeDb, setMenu, setCookingReceipe, setInventory, setIngredients, setStockIngredients } =
  receipeSlice.actions;

export const selectReceipeDb = (state) => state.receipe.receipeDb;
export const selectMenu = (state) => state.receipe.menu;
export const selectCookingReceipe = (state) => state.receipe.cookingReceipe;
export const selectInventory = (state) => state.receipe.inventory;
export const selectIngredients = (state) => state.receipe.ingredients;
<<<<<<< HEAD
export const selectSteps = (state) => state.receipe.steps;
=======
export const selectStockIngredients = (state) => state.receipe.stockIngredients;
>>>>>>> 159efd38d91db55a4969a587fb13656aed84035b
export default receipeSlice.reducer;
