import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup"
import { Container} from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Users from './Users'


function App() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);

  // const db = firebase.firestore().collection("");
  // console.log("HI");

  console.log("ASFJSFLKJASFL:K");

  return (
    <Container className = "d-flex align-itmes-center justify-content-center" style ={{minheight: "100vh"}}>
      <div className = "w-100" style={{maxWidth: '400px '}}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
              <Route exact path="*" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
              <Route exact path ="signup" element={<Signup />}/>
              <Route exact path ="login" element={<Login />}/>
              <Route exact path ="users" element={<Users />}/>
            </Routes>
          </AuthProvider>
        </Router>
      </div>

    </Container>
    
  );
}

export default App;
