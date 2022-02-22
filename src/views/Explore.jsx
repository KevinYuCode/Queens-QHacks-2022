import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectrecipeDb, setCookingrecipe, setrecipeDb } from "../features/recipeSlice";
import DishModal from "../components/dishModal";
import Nav from "../views/Nav";

function Explore() {
  const dispatch = useDispatch(setrecipeDb);

  const readyCook = (recipe) => {
    dispatch(setCookingrecipe(recipe));
  };

  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    name: "",
    image: "",
    description: "",
  });
  const recipes = useSelector(selectrecipeDb);
  const queryRef = useRef();

  const [filterList, setFilterList] = useState(recipes);

  const filterSearch = () => {
    let query = queryRef.current.value;
    let filtered = [];

    const regex = new RegExp(query, "i");
    if (query === "") {
      setFilterList(recipes);
      return;
    }
    for (let i = 0; i < recipes.length; i++) {
      if (regex.test(recipes[i].name)) {
        filtered.push(recipes[i]);
      }
    }
    setFilterList(filtered);
  };

  const passModalProps = (name, image, description, dish) => {
    setModalProps({
      name,
      image,
      description,
      dish,
    });
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (queryRef.current.value === "") {
      setFilterList(recipes);
    }
  }, [recipes]);
  return (
    <>
      <Nav />
      <div className="container explore-bg">
        <div className="explore-container">
          {/* Search Dishes */}
          <h1>Explore New Dishes</h1>
          <input
            placeholder="Search Dish"
            type="input"
            className="explore-search"
            ref={queryRef}
            onChange={() => {
              filterSearch();
            }}
          />

          <div className="explore-recipe-container">
            {filterList.map((dish, i) => (
              <div className="explore-recipe">
                <img key={i} src={dish.image} alt="" className="recipe-image" />
                <div className="recipe-info-container">
                  <p className="explore-dish-name">{dish.name.toUpperCase()}</p>
                  <p className="explore-dish-desc"></p>
                  <button
                    className="explore-cook"
                    onClick={() => {
                      toggleModal();
                      passModalProps(dish.name, dish.image, dish.description, dish);
                    }}
                  >
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showModal && <DishModal toggleModal={toggleModal} modalProps={modalProps} readyCook={readyCook} />}
      </div>
    </>
  );
}

export default Explore;
