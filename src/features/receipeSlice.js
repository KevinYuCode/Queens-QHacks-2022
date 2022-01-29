import { createSlice } from "@reduxjs/toolkit";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpeg";
const initialState = {
    receipeDb: [{
        name: "GOOD FOOD",
        image: image1,
    },
    {
        name: "GOOD",
        image: image2,
    },
    {
        name: "GOOD FOOD",
        image: image3,
    },
    {
        name: "GOOD FOOD",
        image: image4,
    },
    {
        name: "GOOD FOOD",
        image: image5,
    },
    {
        name: "GOOD FOOD",
        image: image6,
    },
    {
        name: "GOOD FOOD",
        image: image3,
    },
    {
        name: "GOOD FOOD",
        image: image4,
    },
    {
        name: "GOOD FOOD",
        image: image5,
    },
    {
        name: "new word",
        image: image6,
    },
    {
        name: "new word",
        image: image3,
    },
    {
        name: "new word",
        image: image4,
    },
    {
        name: "new word",
        image: image5,
    },
    {
        name: "new word",
        image: image6,
    },
    {
        name: "new word",
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
    menu: [
        {
            name: "new word",
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
        instructions: ""
    },
    inventory: []

};

const receipeSlice = createSlice({
    name: "receipe",
    initialState,

    reducers: {
        setReceipe: (state, action) => {
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
        }
    },
});

export const { setReceipeDb, setMenu, setCookingReceipe, setInventory } = receipeSlice.actions;

export const selectReceipeDb = (state) => state.receipe.receipeDb;
export const selectMenu = (state) => state.receipe.menu;
export const selectCookingReceipe = (state) => state.receipe.cookingReceipe;
export const selectInventory = (state) => state.receipe.inventory;

export default receipeSlice.reducer;
