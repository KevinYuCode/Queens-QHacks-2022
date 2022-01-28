import logo from './logo.svg';
import Nav from "./views/Nav";
import Home from "./views/Home";
import Explore from "./views/Explore";
import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={(<Home />)} />
          <Route path="/explore" element={(<Explore />)} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
