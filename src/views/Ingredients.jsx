import React, { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import IngredientsBg from "../assets/IngredientsBG.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { selectInventory, selectIngredients } from "../features/receipeSlice";
function Ingredients() {
  const inventory = useSelector(selectInventory);
  const [updating, setUpdating] = useState(false);
  const [tempList, setTempList] = useState(["Item", "Item", "Item", "Item", "Item", "Item"]);
  const [suggested, setSuggested] = useState([]);
  const ingredients = useSelector(selectIngredients);
  const queryRef = useRef();

  const filterIngredient = () => {
    let query = queryRef.current.value;
    let filtered = [];

    if (query === "") {
      setSuggested([]);
    }

    const regex = new RegExp(query, "i");
    for (let i = 0; i < ingredients.length; i++) {
      if (regex.test(ingredients[i].name)) {
        filtered.push(ingredients[i]);
      }
    }
    setSuggested(filtered);
  };
  return (
    <div className="ingredient-container">
      {/* Right Side Modal */}
      {updating && (
        <div className="ingredient-input-container">
          <h2>Add Ingredients</h2>
          <input
            ref={queryRef}
            className="ingredient-search-input"
            onChange={() => {
              filterIngredient();
            }}
            placeholder="Search Ingredient"
            type="text"
          />

          <div className="suggested-ingredient">
            {suggested.length !== 0 && suggested.map((item) => <div className="suggested-item">{item}</div>)}
          </div>

          {/* <div className="added-stock-container">
            {tempList.map((item) => (
              <div className="temp-stock">{item}</div>
            ))}
          </div> */}
          <button className="save-list">Update Inventory</button>
        </div>
      )}

      {/* Main Inventory Page */}
      <div className="ingredient-list" style={{ gridColumn: updating ? "1/2" : "1/-1" }}>
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
      {!updating ? (
        <div
          className="add-ingredient"
          onClick={() => {
            setUpdating(true);
          }}
        >
          <AiOutlinePlus />
        </div>
      ) : (
        <div
          className="exit-ingredient"
          onClick={() => {
            setUpdating(false);
          }}
        >
          X
        </div>
      )}
    </div>
  );
}

export default Ingredients;
