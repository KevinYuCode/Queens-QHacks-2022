import React from "react";
import Logo from "../assets/ML COOK.png";
import AccIcon from "../assets/JohnnyBravo.png";
import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <nav className="container nav-bg">
      <div className="nav-container">
        <div className="logo-name-container">
          <img src={Logo} alt="logo-name" className="logo-name" />
        </div>
        <div className="nav-links-container">
          <div className="nav-links">
            <NavLink activeClassName exact className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink activeClassName className="nav-link" to="/hfdsa">
              Explore
            </NavLink>
            <NavLink activeClassName className="nav-link" to="/fdsh">
              Cook
            </NavLink>
            <NavLink activeClassName className="nav-link" to="/fsdah">
              Ingredients
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
