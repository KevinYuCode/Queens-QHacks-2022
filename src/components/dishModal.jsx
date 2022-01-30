import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIngredients, setCookingReceipe } from "../features/receipeSlice";

function dishModal({ modalProps, toggleModal, readyCook }) {
  return (
    <div className="modal-container">
      <div className="modal-image-container">
        <img src={modalProps.image} alt="Dish Image" className="modal-image" />
      </div>
      <div className="modal-dish-info">
        <h2 className="modal-dish-name">{modalProps.name}</h2>
        {/* <p className="modal-description">{modalProps.description}</p> */}
        <p className="modal-description">{modalProps.description}</p>
        <div className="modal-btn-container">
          <NavLink to="/cook">
            <button
              className="modal-cook-btn"
              onClick={() => {
                readyCook(modalProps.dish);
              }}
            >
              Start Cooking
            </button>
          </NavLink>
        </div>
        <div
          className="modal-exit-btn"
          onClick={() => {
            toggleModal();
          }}
        >
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
}

export default dishModal;
