import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import IngredientsBg from "../assets/IngredientsBG.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { selectInventory } from "../features/receipeSlice";
function Ingredients() {
  const inventory = useSelector(selectInventory);
  return (
    <div className="ingredient-container">
      <div className="ingredient-input-container"></div>
      <div className="add-ingredient">
        <AiOutlinePlus />
      </div>
      <div className="ingredients-header">
        <h1>Ingredient Inventory</h1>
      </div>
      <div className="inventory-container">
        {inventory.length === 0 ? (
          <div className="empty-inventory-container">
            <h2>Ingredient Inventory Empty.</h2>
            <p>Click the '+' symbol and add ingrident stock</p>
          </div>
        ) : (
          inventory.map((item) => (
            <div className="ingredient">
              <p className="item-name">{item}</p>
              <div className="trash">
                <BsTrash />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Ingredients;
