import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase/firebase";
import { onSnapshot, doc, getDoc, query, where, collection } from "firebase/firestore";

import {
  selectMenu,
  setCookingrecipe,
  selectrecipeDb,
  selectStockIngredients,
  setMenu,
} from "../features/recipeSlice";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";

function Menu() {
  const dispatch = useDispatch();

  const menu = useSelector(selectMenu); //Menu recipes that are ready to cook

  useEffect(() => {
    getMenuData();
  }, []);

  // const collectionListener = (collection)=>{
  //   const collectionQuery = query(db, "users", where("email", "==", auth.currentUser.email));

  //   onSnapshot(collectionQuery, (querySnapshot) => {
  //     console.log("FIREBASE LISTENER");
  //     console.log(querySnapshot)
  //     // console.log(doc);
  //   });
  // }

  const getMenuData = async () => {
    //Gets the user's possible menu dishes
    let temp = [];
    var userArray = [];

    // retrieve user's unique document
    const docRef = doc(db, "users", auth.currentUser.email);

    // get ingredients list from user
    await getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        userArray = docSnap.data().ingredients;

        // retrieve recipes collection, find all recipes that contain ingredients that the user has
        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("ingredients", "array-contains-any", userArray));

        // push these recipes to temp array to set the menu page with recommendations
        onSnapshot(q, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id });
          });
          dispatch(setMenu(temp));
        });
      } else {
        console.log("Document not found!");
      }
    });
  };

  return (
    <div>
      <Nav />
      <div className="menu-container">
        {menu.length === 0 ? (
          <div className="no-menu-recipes">
            <h1>Currently no available recipes with current stock ingredients...</h1>
          </div>
        ) : (
          menu.map((dish, i) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default Menu;
