import React, { useState, useEffect, useRef } from "react";
import AccIcon from "../assets/JohnnyBravo.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from "react-redux";
import { selectrecipeDb, setrecipeDb, setCookingrecipe } from "../features/recipeSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";

import Nav from "../views/Nav";

function Home() {
  const dispatch = useDispatch();
  const recipe = useSelector(selectrecipeDb);
  const featuredRef = useRef();

  return (
    <>
      <Nav />
      <div id="home" className="container home-bg">
        <div className="home-container">
          <div className="greeting-container">
            <div className="greeting-text">
              <h1 className="home-title">Welcome to Cook Hack</h1>
              <h3>Explore new recipes with the help of Machine Learning provided by the HOTG API!</h3>
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
            {recipe.length > 0 && (
              <div className="featured-dishes" id="featured">
                <Carousel
                  showThumbs={false}
                  showIndicators={false}
                  emulateTouch={false}
                  autoPlay={true}
                  infiniteLoop={true}
                >
                  {recipe.map((dish, i) => (
                    <div key={i} className="dish-container" ref={featuredRef}>
                      <NavLink to="/cook">
                        <div
                          className="dish-image-container"
                          onClick={() => {
                            dispatch(setCookingrecipe(dish));
                          }}
                        >
                          <img src={dish.image} alt="" className="dish-image" />
                          <p className="dish-name">{dish.name}</p>
                        </div>
                      </NavLink>
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
