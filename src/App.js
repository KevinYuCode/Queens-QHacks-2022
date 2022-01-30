import logo from "./logo.svg";
import Nav from "./views/Nav";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Cook from "./views/Cook";
import Ingredients from "./views/Ingredients";
import Explore from "./views/Explore";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReceipeDb, selectReceipeDb, setIngredients } from "./features/receipeSlice";

import React, { useEffect, useState } from "react";
import Signup from "./components/Signup"
import { Container} from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './components/CreatePost'
import Review from './components/Review'
import { auth } from './firebase/firebase'

function App() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  const fetchData = async () => {
    let mainIngredients = [];
    let mainSteps = [];
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        data.map((item, i) => {
          const buildItems = item.ingredients.split(",");
          buildItems[0] = buildItems[0].slice(1, buildItems[0].length);
          let lastItem = buildItems[buildItems.length - 1];
          lastItem = lastItem.slice(0, lastItem.length - 1);
          buildItems[buildItems.length - 1] = lastItem;

          const buildItems2 = item.ingredients.split(",");
          buildItems2[0] = buildItems2[0].slice(1, buildItems2[0].length);
          let lastItem2 = buildItems2[buildItems2.length - 1];
          lastItem2 = lastItem2.slice(0, lastItem2.length - 1);
          buildItems2[buildItems2.length - 1] = lastItem2;

          data[i].steps = buildItems2;
          data[i].ingredients = buildItems;

          for (let i = 0; i < buildItems.length; i++) {
            mainIngredients.push(buildItems[i]);
          }
        });
        // console.log(data);
        dispatch(setIngredients(mainIngredients));
        dispatch(setReceipeDb(data));
      });
  };

  // this fetches user's ingredient list
  const [Userdata, setUserData] = useState([]);
  const fetchUserData = async () => { // fetch full recipe data from flask on startup
    fetch("/availability")
      .then((res) => res.json())
      .then((Userdata) => {
        setData(Userdata);
        console.log(Userdata) // test out api fetch
        //dispatch(setReceipeDb(data));
      });

  };

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);

  return (
    <div className="App">
        <Router>
          <AuthProvider>
            
            <Routes>
               <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>}/>
              <Route exact path="*" element={<PrivateRoute><Home /></PrivateRoute>}/> 
               <Route exact path="/" element={(<Home />)} />
               <Route path="/explore" element={(<Explore />)} />
              <Route path="/menu" element={(<Menu />)} />
              <Route path="/cook" element={(<Cook />)} />
              <Route path="/ingredients" element={(<Ingredients/>)} />
              <Route path ="/signup" element={<Signup />}/>
              <Route path ="/login" element={<Login />}/>
              <Route path ="/createpost" element={<CreatePost />}/>
              <Route path ="/review" element={<Review isAuth={isAuth}/>}/>


            </Routes>
            
          </AuthProvider>
        </Router>
    </div>
  )}

  export default App;
