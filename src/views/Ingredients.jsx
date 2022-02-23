import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineCheckSquare } from "react-icons/ai";
import { auth, db } from "../firebase/firebase";
import { BsTrash } from "react-icons/bs";
import IngredientsBg from "../assets/IngredientsBG.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

import {
  selectInventory,
  selectIngredients,
  selectStockIngredients,
  setStockIngredients,
  setUsersIngredients,
  selectUsersIngredients,
} from "../features/recipeSlice";
import Nav from "../views/Nav";
import userQuery from "../components/userIngredients";

function Ingredients() {
  const inventory = useSelector(selectInventory);
  const [updating, setUpdating] = useState(false);
  const [tempList, setTempList] = useState([]);
  const usersIngredients = useSelector(selectUsersIngredients);
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

  const updateInventory = async () => {
    await userQuery("OVERWRITE", auth.currentUser.email, tempList);
    alert("Updated Inventory Successfully.")
    getUsersIngredients();
  };

  const getUsersIngredients = async () => {
    var userArray = [];
    const docRef = doc(db, "users", auth.currentUser.email);

    await getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        //console.log(docSnap.data().ingredients);
        userArray = docSnap.data().ingredients;
        dispatch(setUsersIngredients(userArray));
      } else {
        console.log("No such document!");
      }
    });
  };

  useEffect(() => {
    let tempList = [];
    usersIngredients.forEach((item) => {
      tempList.push(item);
    });
    setTempList(tempList);
  }, [usersIngredients]);
  
  useEffect(() => {
    getUsersIngredients();
  }, []);

  return (
    <>
      <Nav />
      <div className="ingredient-container">
        {/* UPDATE INGREDIENTS */}
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

          {/* Existing Stock Inventory */}
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
              updateInventory();
            }}
          >
            Update Inventory
          </button>
        </div>

        {/* Main Inventory Page */}
        <div className="ingredient-list" style={{ gridColumn: "1/2" }}>
          <div className="ingredients-header">
            <h1>Ingredient Inventory</h1>
          </div>
          <div className="inventory-container">
            {usersIngredients.length === 0 ? (
              <div className="empty-inventory-container">
                <h2>Ingredient Inventory Empty.</h2>
                <p>Search and add ingredients on the right panel.</p>
              </div>
            ) : (
              usersIngredients.map((item) => (
                <div className="ingredient">
                  <p className="item-name">{item}</p>
                </div>
              ))
            )}
          </div>
        </div>
        {/* {!updating ? (
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
        )} */}
      </div>
    </>
  );
}

export default Ingredients;
