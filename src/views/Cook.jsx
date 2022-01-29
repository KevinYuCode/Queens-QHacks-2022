import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCookingReceipe } from "../features/receipeSlice";
import { AiOutlineCheckSquare } from "react-icons/ai";

function Cook() {
  const cookingReceipe = useSelector(selectCookingReceipe);
  const { name, image } = cookingReceipe;
  const [instructionBatch, setInstructionBatch] = useState([
    "Put tomato in oven",
    "Salt Garlic",
    "Put rice in microwave",
    "Put tomato in oven",
    "Put rice in microwave",
  ]);
  return (
    <div className="cook-container">
      <div className="cook-header">
        <div className="cook-content-container">
          <div className="instructions-container">
            <h1 className="cook-receipe-name">{name}</h1>
            <h3 className="instructions-title">Instructions</h3>
            <div className="instruction-batch">

              {instructionBatch.map((step) => (
                <div className="instruction-item">
                  <input type="checkbox" className="instruction-checkbox" />
                  <p className="instruction">{step}</p>
                </div>
              ))}
            </div>
            <div className="steps-btn-container">
              <button className="prev-instruction">Previous Step</button>
              <button className="next-instruction">Next Step</button>
            </div>
          </div>
          <div className="ingredients-container">
            <h3>Ingredients</h3>
            <div className="ingredient-list">
              {[
                "Tomato",
                "Apple",
                "grapes",
                "flour",
                "peanuts",
                "Tomato",
                "Apple",
                "grapes",
                "flour",
                "peanuts",
              ].map((ingredient) => (
                <div className="ingredient">
                  <p className="checkmark">
                    <AiOutlineCheckSquare />
                  </p>
                  <p>{ingredient}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cook-image-container">
          <img className="cook-image" src={image} alt="Dish Image" />
        </div>
      </div>
    </div>
  );
}

export default Cook;
