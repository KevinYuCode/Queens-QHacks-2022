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
import { setReceipeDb } from "./features/receipeSlice";

function App() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const fetchData = async () => { // fetch full recipe data from flask on startup
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data) // test out api fetch
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
        <Nav />
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
