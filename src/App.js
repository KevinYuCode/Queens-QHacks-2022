import logo from "./logo.svg";
import Nav from "./views/Nav";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Cook from "./views/Cook";
import Ingredients from "./views/Ingredients";
import Explore from "./views/Explore";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./components/CreatePost";
import Review from "./components/Review";
import { auth, db } from "./firebase/firebase";
import { getDocs, collection, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Index from "./components/index.tsx";
import {
  setReceipeDb,
  selectReceipeDb,
  setIngredients,
  setStockIngredients,
} from "./features/receipeSlice";

import { userQuery } from "./components/userIngredients";
function App() {
  const dispatch = useDispatch();

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const getReceipeData = async () => {
    const receipeCollection = collection(db, "recipes");

    let tempData = [];
    let snapshot = await getDocs(receipeCollection);
    try {
      snapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        tempData.push(data);
      });
      dispatch(setReceipeDb(tempData));
    } catch (e) {
      console.log(e);
    }
  };

  const getUsersIngredients = async () => {
    const docRef = collection(db, "users", auth.currentUser.email);
    console.log(auth.currentUser.email);
    await getDoc(docRef).then((docSnap) => {
      console.log("hi");
      if (docSnap.exists()) {
        let userIngredients = docSnap.data().ingredients;
        console.log(userIngredients);
      } else {
        console.log("No such document!");
      }
    });
  };

  useEffect(() => {
    //Loads user's ingredients when logged in
    getUsersIngredients();
  }, []);

  useEffect(() => {
    getReceipeData();
  });

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="*"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route exact path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cook" element={<Cook />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/review" element={<Review isAuth={isAuth} />} />
            <Route
              path="/detection"
              element={
                <>
                  <div className="app-nav">
                    <Nav />
                    <Index />
                  </div>
                </>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
