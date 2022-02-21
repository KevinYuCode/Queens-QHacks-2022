import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMenu,
  setCookingReceipe,
  selectReceipeDb,
  selectStockIngredients,
  setMenu,
} from "../features/receipeSlice";
import { NavLink } from "react-router-dom";
import Nav from './Nav'

import Nav from "../views/Nav";

function Menu() {
  const dispatch = useDispatch();

  const menu = useSelector(selectMenu); //Menu receipes that are ready to cook
  const receipeDb = useSelector(selectReceipeDb); //Receipe database
  const stockIngredients = useSelector(selectStockIngredients); //User's available stock ingredients

  useEffect(() => {
    const rtcReceipes = [];
    let receipeIng = [];
    for (let k = 0; k < receipeDb.length; k++) {
      receipeIng = receipeDb[k].ingredients;
      let count;
      for (let i = 0; i < receipeIng.length; i++) {
        count = 0;
        //Go through all of the user's ingredients
        for (let j = 0; j < stockIngredients.length; j++) {
          if (receipeIng[i] === stockIngredients[j]) {
            count++;
          }
        }
        if (count > 0) {
          rtcReceipes.push(receipeDb[k]); // if atleast one of the ingredient matches the user's list, return the receipe
        }
      }
    }
    dispatch(setMenu(rtcReceipes));
  }, []);

  return (
    <div>
      <Nav />
      <div className="menu-container">
        {menu
          ? <div className="no-menu-receipes"><h1>Currently no available receipes with current stock ingredients...</h1></div>
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
                        dispatch(setCookingReceipe(dish)); //Make sure to add more params if needed
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
