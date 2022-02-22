import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMenu,
  setCookingrecipe,
  selectrecipeDb,
  selectStockIngredients,
  setMenu,
} from "../features/recipeSlice";
import { NavLink } from "react-router-dom";
import Nav from './Nav'


function Menu() {
  const dispatch = useDispatch();

  const menu = useSelector(selectMenu); //Menu recipes that are ready to cook
  const recipeDb = useSelector(selectrecipeDb); //recipe database
  const stockIngredients = useSelector(selectStockIngredients); //User's available stock ingredients

  useEffect(() => {
    const rtcrecipes = [];
    let recipeIng = [];
    for (let k = 0; k < recipeDb.length; k++) {
      recipeIng = recipeDb[k].ingredients;
      let count;
      for (let i = 0; i < recipeIng.length; i++) {
        count = 0;
        //Go through all of the user's ingredients
        for (let j = 0; j < stockIngredients.length; j++) {
          if (recipeIng[i] === stockIngredients[j]) {
            count++;
          }
        }
        if (count > 0) {
          rtcrecipes.push(recipeDb[k]); // if atleast one of the ingredient matches the user's list, return the recipe
        }
      }
    }
    dispatch(setMenu(rtcrecipes));
  }, []);

  return (
    <div>
      <Nav />
      <div className="menu-container">
        {menu
          ? <div className="no-menu-recipes"><h1>Currently no available recipes with current stock ingredients...</h1></div>
          : menu.map((dish, i) => (
              <div className="menu-card" key={i}>
                <div className="menu-dish-image-container">
                  <img src={dish.image} alt="" className="menu-dish-image" />
                </div>
                <div className="menu-content">
                  <div className="menu-info">
                    <h1 className="menu-dish-name">{dish.name}</h1>
                    <div className="menu-description">
                      <h3 className="menu-sub-title">Description</h3>
                      <p className="description">{dish.description}</p>
                    </div>
                  </div>
                  <NavLink to="/cook">
                    <button
                      className="menu-cook-btn"
                      onClick={() => {
                        dispatch(setCookingrecipe(dish)); //Make sure to add more params if needed
                      }}
                    >
                      Cook Now
                    </button>
                  </NavLink>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Menu;
