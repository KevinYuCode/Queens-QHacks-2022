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
  const fetchData = async () => {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
<<<<<<< HEAD
        //dispatch(setReceipeDb(data));
        console.log(data)
=======
        console.log(data)
        dispatch(setReceipeDb(data));
>>>>>>> 674b7c9a131812208ee4006a3a922ad5de0a17c1
      });

  };

  useEffect(() => {
    fetchData();
    
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
