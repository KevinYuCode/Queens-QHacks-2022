import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu, setCookingReceipe } from "../features/receipeSlice";

function Menu() {
  const dispatch = useDispatch();
  const menu = useSelector(selectMenu);
  const cookReceipe = ({ name, image }) => {
    dispatch(
      setCookingReceipe({
        name,
        image,
      })
    );
  };
  return (
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
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa eius fugiat enim cupiditate
                  consequuntur dolorem, nihil adipisci labore ipsum fugit.
                </p>
              </div>
            </div>
            <button
              className="menu-cook-btn"
              onClick={() => {
                cookReceipe(dish); //Make sure to add more params if needed
              }}
            >
              Cook Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
