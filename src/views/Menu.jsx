import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMenu,
  setCookingReceipe,
  selectReceipeDb,
  selectStockIngredients,
  setMenu,
} from "../features/receipeSlice";
import DishModal from "../components/dishModal";
import { NavLink } from "react-router-dom";

import Nav from "../views/Nav";

function Menu() {
  const dispatch = useDispatch();
  const menu = useSelector(selectMenu);
  const readyCook = (receipe) => {
    dispatch(setCookingReceipe(receipe));
  };
  const [data, setData] = useState([{}]);
  const receipeDb = useSelector(selectReceipeDb);
  const cookReceipe = ({ name, image }) => {
    dispatch(
      setCookingReceipe({
        name,
        image,
      })
    );
  };
  const stockIngredients = useSelector(selectStockIngredients);

  useEffect(()=>{
    const rtgReceipes = [];
    let receipeIng = [];
    for (let k = 0; k < receipeDb.length; k++) {
      receipeIng = receipeDb[k].ingredients;
      let count;
      for (let i = 0; i < receipeIng.length; i++) {
        count = 0;
        // console.log(receipeIng[i]);
        //Go through all of the user's ingredients
        for (let j = 0; j < stockIngredients.length; j++) {
          if (receipeIng[i] === stockIngredients[j]) {
            console.log("YEEEEE");
            count++;
          }
        }
        if (count > 0) {
          rtgReceipes.push(receipeDb[k]); // if atleast one of the ingredient matches the user's list, return the receipe
        }
      }
    }
    console.log(rtgReceipes);
    dispatch(setMenu(rtgReceipes));
  },[])

  return (
    <div>
      <Nav />
      <div className="menu-container">
        {menu.map((dish, i) => (
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
                    readyCook(dish); //Make sure to add more params if needed
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
