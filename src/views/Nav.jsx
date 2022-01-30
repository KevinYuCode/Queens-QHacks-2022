import Logo from "../assets/cookhack.png";
import AccIcon from "../assets/JohnnyBravo.png";
import { NavLink } from "react-router-dom";
import React, {useState} from "react";
import Logo from "../assets/ML COOK.png";
import AccIcon from "../assets/profile.jpg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {useAuth} from '../contexts/AuthContext'


function Nav() {
  const [error, setError] = useState("")
  const {currentUser, logout} = useAuth()
  const history = useNavigate()

    async function handleLogout()
    {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError("Failed to log out")
        }
    }


  return (
    <nav className="container nav-bg">
      <div className="nav-container">
        <div className="logo-name-container">
          <img src={Logo} alt="logo-name" className="logo-name" />
        </div>
        <div className="nav-links-container">
          <div className="nav-links">
            <NavLink exact className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/review">
              Reviews
            </NavLink>
            <NavLink className="nav-link" to="/explore">
              Explore
            </NavLink>
            <NavLink className="nav-link" to="/menu">
              Menu
            </NavLink>
            <NavLink className="nav-link" to="/cook">
              Cook
            </NavLink>
            <NavLink className="nav-link" to="/ingredients">
              Ingredients
            </NavLink>
            <NavLink className="nav-link" to="/login" onClick={handleLogout}>
              Log Out
            </NavLink>
          </div>
          <div className="nav-login-icon">
            <img src={AccIcon} alt="" className="login-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
