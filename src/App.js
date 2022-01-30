import logo from "./logo.svg";
import Nav from "./views/Nav";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Cook from "./views/Cook";
import Ingredients from "./views/Ingredients";
import Explore from "./views/Explore";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReceipeDb, selectReceipeDb, setIngredients } from "./features/receipeSlice";

function App() {
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
<<<<<<< HEAD

  const fetchData = async () => {
    let mainIngredients = [];
    let mainSteps = [];
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
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
=======
  const fetchData = async () => {
    // fetch full recipe data from flask on startup
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data); // test out api fetch
>>>>>>> api_dev
        dispatch(setReceipeDb(data));
      });
  };

  // this fetches user's ingredient list
  const [Userdata, setUserData] = useState([]);
  const fetchUserData = async () => {
    // fetch full recipe data from flask on startup
    fetch("/availability")
      .then((res) => res.json())
      .then((Userdata) => {
<<<<<<< HEAD
        // setData(Userdata);
        console.log(Userdata) // test out api fetch
=======
        setData(Userdata);
        console.log(Userdata); // test out api fetch
>>>>>>> api_dev
        //dispatch(setReceipeDb(data));
      });
  };

  useEffect(() => {
    fetchData();
    // fetchUserData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cook" element={<Cook />} />
          <Route path="/ingredients" element={<Ingredients />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
