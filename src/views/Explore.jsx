import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReceipeDb, setReceipeDb } from "../features/receipeSlice";
import DishModal from "../components/dishModal";

function Explore() {
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    name: "",
    image: "",
    description: "",
  });
  const receipes = useSelector(selectReceipeDb);
  const queryRef = useRef();

  const [filterList, setFilterList] = useState(receipes);

  const filterSearch = () => {
    let query = queryRef.current.value;
    let filtered = [];

    const regex = new RegExp(query, "i");
    if (query === "") {
      setFilterList(receipes);
      return;
    }
    for (let i = 0; i < receipes.length; i++) {
      if (regex.test(receipes[i].name)) {
        filtered.push(receipes[i]);
      }
    }
    setFilterList(filtered);
  };

  const passModalProps = (name, image, description) => {
    setModalProps({
      name,
      image,
      description,
    });
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
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
        <div className="explore-receipe-container">
          {filterList.map((dish, i) => (
            <div className="explore-receipe">
              <img key={i} src={dish.image} alt="" className="receipe-image" />
              <div className="receipe-info-container">
                <h3>{dish.name}</h3>
                <p className="explore-dish-desc">Here is the description</p>
                <button
                  className="explore-cook"
                  onClick={() => {
                    toggleModal();
                    passModalProps(dish.name, dish.image, dish.description);
                  }}
                >
                  See More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && <DishModal toggleModal={toggleModal} modalProps={modalProps} />}
    </div>
  );
}

export default Explore;
