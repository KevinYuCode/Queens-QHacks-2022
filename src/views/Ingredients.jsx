import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineCheckSquare } from "react-icons/ai";
import { auth, db } from "../firebase/firebase";
import { BsTrash } from "react-icons/bs";
import IngredientsBg from "../assets/IngredientsBG.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInventory,
  selectIngredients,
  selectStockIngredients,
  setStockIngredients,
} from "../features/receipeSlice";
import Nav from "../views/Nav";

function Ingredients() {
  const inventory = useSelector(selectInventory);
  const [updating, setUpdating] = useState(false);
  const [tempList, setTempList] = useState([]);
  const stockIngredients = useSelector(selectStockIngredients);
  const [suggested, setSuggested] = useState([]);
  const [reRender, setRerender] = useState(0);
  const ingredients = useSelector(selectIngredients);
  const queryRef = useRef();
  const dispatch = useDispatch();


  /**
   *  Filters the ingredient list based on search input
   * @returns void
   */
  const filterIngredient = () => {
    let query = queryRef.current.value;
    let filtered = [];

    if (query === "") {
      setSuggested([]);
      return;
    }

    const regex = new RegExp(query, "i");
    for (let i = 0; i < ingredients.length; i++) {
      if (regex.test(ingredients[i])) {
        filtered.push(ingredients[i]);
      }
    }
    setSuggested(filtered);
  };

  /**
   * Add temporary stock item.
   * @param {*} e used to get the user's text input
   * @returns 
   */
  const addTempStock = (e) => {
    let itemName = e.target.nextElementSibling.innerText;
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i] === itemName) {
        return;
      }
    }
    tempList.push(itemName);
    setRerender(reRender + 1);
  };
  const deleteTempItem = (index) => {
    setTempList(tempList.filter((item) => tempList[index] !== item));
  };

  
  return (
    <>
      <Nav />
      <div className="ingredient-container">
        {/* UPDATE INGREDIENTS */}
        {updating && (
          <div className="ingredient-input-container">
            <h2>Add Ingredients</h2>
            <input
              ref={queryRef}
              className="ingredient-search-input"
              onChange={filterIngredient}
              placeholder="Search Ingredient"
              type="text"
            />
            <div className="suggested-ingredient">
              {suggested.map((item) => (
                <div className="suggested-item">
                  <button
                    onClick={(e) => {
                      addTempStock(e);
                    }}
                  >
                    +
                  </button>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="added-stock-container">
              <h2>Ingredients List</h2>
              <div className="stock-list">
                {tempList.map((item, i) => (
                  <div key={i} className="temp-stock">
                    <button
                      className="delete-temp-stock"
                      onClick={() => {
                        deleteTempItem(i);
                      }}
                    >
                      X
                    </button>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="save-list"
              onClick={() => {
                //Add Firebase post request
              }}
            >
              Update Inventory
            </button>
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
                <p>Click the '+' symbol and add ingredient stock</p>
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
    </>
  );
}

export default Ingredients;
