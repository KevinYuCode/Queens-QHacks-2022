import logo from './logo.svg';
import Nav from "./views/Nav";
import Home from "./views/Home";
import Menu from "./views/Menu";
import Cook from "./views/Cook";
import Ingredients from "./views/Ingredients";
import Explore from "./views/Explore";
import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  return (
    //  <Container className = "d-flex align-itmes-center justify-content-center" style ={{minheight: "100vh"}}>
      /* <div className = "w-100" style={{maxWidth: '400px '}}> */
      <div className="App">
        <Router>
          <AuthProvider>
            
            <Routes>
              {/* <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
              <Route exact path="*" element={<PrivateRoute><Dashboard /></PrivateRoute>}/> */}
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

    // </Container>
    
  );
}

export default App;
