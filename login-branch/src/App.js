import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup"
import { Container} from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Users from './Users'
import CreatePost from '../../src/components/CreatePost'
import Review from './components/Review'
import { auth } from '../../src/firebase/firebase'


function App() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  // const db = firebase.firestore().collection("");
  // console.log("HI");

  console.log("ASFJSFLKJASFL:K");

  return (
    //  <Container className = "d-flex align-itmes-center justify-content-center" style ={{minheight: "100vh"}}>
      /* <div className = "w-100" style={{maxWidth: '400px '}}> */
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
              <Route exact path="*" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
              <Route path ="/signup" element={<Signup />}/>
              <Route path ="/login" element={<Login />}/>
              <Route path ="/users" element={<Users />}/>
              <Route path ="/createpost" element={<CreatePost />}/>
              <Route path ="/review" element={<Review isAuth={isAuth}/>}/>
            </Routes>
          </AuthProvider>
        </Router>
      /* </div> */

    // </Container>
    
  );
}

export default App;
