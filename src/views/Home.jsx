import React, { useState, useEffect, useRef } from "react";
import AccIcon from "../assets/JohnnyBravo.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Home() {
  const featuredRef = useRef();
  const [featured, setFeatured] = useState([
    {
      name: "GOOD FOOD",
      image: image1,
    },
    {
      name: "GOOD FOOD",
      image: image2,
    },
    {
      name: "GOOD FOOD",
      image: image3,
    },
    {
      name: "GOOD FOOD",
      image: image4,
    },
    {
      name: "GOOD FOOD",
      image: image5,
    },
    {
      name: "GOOD FOOD",
      image: image6,
    },
  ]);
  const [recommended, setRecommended] = useState([
    {
      name: "GOOD FOOD",
      image: image1,
    },
    {
      name: "GOOD FOOD",
      image: image2,
    },
    {
      name: "GOOD FOOD",
      image: image3,
    },
    {
      name: "GOOD FOOD",
      image: image4,
    },
    {
      name: "GOOD FOOD",
      image: image5,
    },
    {
      name: "GOOD FOOD",
      image: image6,
    },
    {
      name: "GOOD FOOD",
      image: image1,
    },
    {
      name: "GOOD FOOD",
      image: image2,
    },
    {
      name: "GOOD FOOD",
      image: image3,
    },
    {
      name: "GOOD FOOD",
      image: image4,
    },
    {
      name: "GOOD FOOD",
      image: image5,
    },
    {
      name: "GOOD FOOD",
      image: image6,
    },
  ]);

  const autoScroll = (e) => {
    console.log(featuredRef.current);
    console.log(featuredRef.current.clientWidth);
  };

  return (
    <div id="home" className="container home-bg">
      <div className="home-container">
        <div className="greeting-container">
          <div className="greeting-text">
            <h1 className="home-title">Welcome to ML COOK</h1>
            <h3>Explore new receipes and share with others your new cooking skills!</h3>
          </div>
          <div className="cta-container">
            <button className="start-btn">Start Cooking</button>
            <button className="explore-btn">See More</button>
          </div>
        </div>
        <div className="image-slider-container">
          <div className="featured-dishes" id="featured">
            <Carousel
              showThumbs={false}
              showIndicators={false}
              emulateTouch={true}
              autoPlay={true}
              infiniteLoop={true}
            >
              {featured.map((dish) => (
                <div className="dish-container" ref={featuredRef}>
                  <div className="dish-image-container">
                    <img src={dish.image} alt="" className="dish-image" />
                    <p className="dish-name">{dish.name}</p>
                  </div>
                  <div className="dish-cook-cta">
                    <p className="dish-cook-btn">Cook Now</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div id="featured" className="featured-dishes-container"></div>

        {/* <h1 className="recommended-title">Recommended Dishes</h1>
        <div className="recommended-container">
          {recommended.map((dish, i) => (
            <img src={dish.image} alt="" className="recommend-dish" />
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Home;
