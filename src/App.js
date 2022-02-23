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
import {
  onSnapshot,
  updateDoc,
  arrayUnion,
  setDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Index from "./components/index.tsx";
import {
  setrecipeDb,
  selectrecipeDb,
  setIngredients,
  setStockIngredients,
  setMenu,
  setUsersIngredients,
} from "./features/recipeSlice";


function App() {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const getDbData = async () => {
    const recipeCollection = collection(db, "recipes");
    const ingredientsRef = collection(db, "ingredients");

    let tempData = [];
    let tempIngredients = [];
    let snapshot = await getDocs(recipeCollection);
    try {
      snapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        tempData.push(data);
      });
      dispatch(setrecipeDb(tempData));
      console.log(tempData);
    } catch (e) {
      console.log(e);
    }

    let ingredientSnapshot = await getDocs(ingredientsRef);
    try {
      ingredientSnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        tempIngredients.push(...data.ingredients);
        dispatch(setIngredients(tempIngredients));
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    //Loads user's ingredients when logged in
    getDbData();
  }, []);

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
