import logo from './logo.svg';
import Nav from "./views/Nav";
import Home from "./views/Home";
import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={(<Home />)} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
