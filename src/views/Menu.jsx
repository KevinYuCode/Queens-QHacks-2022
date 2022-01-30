import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu, setCookingReceipe, selectReceipeDb} from "../features/receipeSlice";
import DishModal from "../components/dishModal";
import { NavLink } from "react-router-dom";
import Nav from './Nav'


function Menu() {
  const dispatch = useDispatch();
  const readyRecipes = useSelector(selectReceipeDb)
  const readyCook = (receipe) => {
    dispatch(setCookingReceipe(receipe));
  }
  const [data, setData] = useState([{}])
  const menu = useSelector(selectReceipeDb);
  const cookReceipe = ({ name, image }) => {
    dispatch(
      setCookingReceipe({
        name,
        image,
      })
    );
  };

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
                <p className="description">
                  {dish.description}
                </p>
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
