import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userQuery from '../components/userIngredients'
import { auth, db } from '../firebase/firebase'
import { onSnapshot, updateDoc, arrayUnion, setDoc, doc, getDocs, getDoc, query, where, collection } from "firebase/firestore";


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

    getMenuData();
    // dispatch(setMenu());
  }, []);

  const getMenuData = async () => { //Gets the user's possible menu dishes
    let temp = [];
    var userArray = [];


    const docRef = doc(db, "users", auth.currentUser.email)

    await getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        //console.log(docSnap.data().ingredients);
        userArray = docSnap.data().ingredients

        const recipesRef = collection(db, "recipes")
        const q = query(recipesRef, where('ingredients', 'array-contains-any', userArray))

        onSnapshot(q, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id })
          })
          dispatch(setMenu(temp));
        })
      } else {
        console.log("Document not found!");
      }
    })

  }

  return (
    <div>
      <Nav />
      <div className="menu-container">
        {menu === undefined
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
