import React, { useState, useEffect, useRef } from "react";
import AccIcon from "../assets/JohnnyBravo.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from "react-redux";
import { selectReceipeDb, setReceipeDb, setCookingReceipe } from "../features/receipeSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";

import Nav from "../views/Nav";

function Home() {
  const dispatch = useDispatch();
  const receipe = useSelector(selectReceipeDb);
  const readyCook = (receipe) => {
    dispatch(setCookingReceipe(receipe));
  };
  const featuredRef = useRef();
  const [data, setData] = useState([{}]); // state for api query

  return (
    <>
      <Nav />
      <div id="home" className="container home-bg">
        <div className="home-container">
          <div className="greeting-container">
            <div className="greeting-text">
              <h1 className="home-title">Welcome to Cook Hack</h1>
              <h3>Explore new receipes and share with others your new cooking skills!</h3>
            </div>
            <div className="cta-container">
              <NavLink to="/menu" className="start-btn">
                Start Cooking
              </NavLink>
              <NavLink to="/explore" className="explore-btn">
                See More
              </NavLink>
            </div>
          </div>
          <div className="image-slider-container">
            {receipe.length > 0 && (
              <div className="featured-dishes" id="featured">
                <Carousel
                  showThumbs={false}
                  showIndicators={false}
                  emulateTouch={true}
                  autoPlay={false}
                  infiniteLoop={true}
                >
                  {receipe.map((dish, i) => (
                    <div key={i} className="dish-container" ref={featuredRef}>
                      <div className="dish-image-container">
                        <img src={dish.image} alt="" className="dish-image" />
                        <p className="dish-name">{dish.name}</p>
                      </div>
                      <div className="dish-cook-cta">
                        <NavLink
                          to="/cook"
                          className="menu-cook-btn"
                          onClick={() => {
                            readyCook(dish); //Make sure to add more params if needed
                          }}
                        >
                          Cook Now
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
          <div id="featured" className="featured-dishes-container"></div>
        </div>
      </div>
    </>
  );
}

export default Home;
