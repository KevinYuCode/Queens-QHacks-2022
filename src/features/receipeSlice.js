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
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
    {
      name: "new word",
      image: image4,
      description: "HI",
    },
  ],
  menu: [
    {
      name: "name1",
      image: image3,
    },
    {
      name: "new word",
      image: image4,
    },
    {
      name: "GOOfhgD FOOD",
      image: image5,
    },
    {
      name: "GOOD FOOD",
      image: image6,
    },
  ],
  cookingReceipe: {
    name: "new word",
    image: image3,
    instructions: "",
  },
  inventory: [],
  ingredients: ["Tomato", "Potato", "peas", "Maccoroni", "Cheese"],
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
  },
});

export const { setReceipeDb, setMenu, setCookingReceipe, setInventory, setIngredients } =
  receipeSlice.actions;

export const selectReceipeDb = (state) => state.receipe.receipeDb;
export const selectMenu = (state) => state.receipe.menu;
export const selectCookingReceipe = (state) => state.receipe.cookingReceipe;
export const selectInventory = (state) => state.receipe.inventory;
export const selectIngredients = (state) => state.receipe.ingredients;
export default receipeSlice.reducer;
