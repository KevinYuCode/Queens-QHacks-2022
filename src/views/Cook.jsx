import React, { useState, useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { selectCookingReceipe, selectIngredients } from "../features/receipeSlice";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Nav from "../views/Nav";

function Cook() {
  const cookingReceipe = useSelector(selectCookingReceipe);
  console.log(cookingReceipe.ingredients);
  const { name, image } = cookingReceipe;
  // use displayList array that only stores 5 strings and update it each time next step or previous step is clicked
  const displayList = [];
  const [instructionBatch, setInstructionBatch] = useState([[]]);
  const [batchIndex, setBatchIndex] = useState(0);
  // const ingredients = useSelector(selectIngredients);


  console.log(cookingReceipe.steps);
  // chopped = cookingReceipe.length > 0 ? cookingReceipe.steps.split(",") : [];

  // const [mainInstructions, setMainInstructions] = useState(chopped);

  const formatBatch = () => {
    let tempArray = [];
    let tempInArray = [];

    for (let i = 0; i < cookingReceipe.steps.length; i++) {
      //So if we have 5 instructions we add the array into array [[1,2,3,5],]
      if (i !== 0 && i % 5 === 0) {
        tempArray.push(tempInArray);
        tempInArray = [];
      }
      //Checks if we've reached end of the array to store the last batch.
      if (i === cookingReceipe.steps.length - 1) {
        tempArray.push(tempInArray);
        setInstructionBatch(tempArray);
      }

      //Fills up the temp batch with the 5 instructions
      tempInArray.push(cookingReceipe.steps[i]);
    }
  };
  const switchSteps = (val) => {
    let tempIndex = batchIndex;
    if (tempIndex + val > instructionBatch.length - 1 || tempIndex + val < 0) {
      return;
    }
    setBatchIndex(batchIndex + val);
  };

  useEffect(() => {
    formatBatch();
  }, []);

  return (
    <>
      <Nav />
      <div className="cook-container">
        <div className="cook-header">
          <div className="cook-content-container">
            <div className="instructions-container">
              <h1 className="cook-receipe-name">{name}</h1>
              <h3 className="instructions-title">Instructions</h3>
              {/* INSTRUCTIONS */}
              <div className="instruction-batch">
                {cookingReceipe &&
                  instructionBatch[batchIndex].map((step) => (
                    <div className="instruction-item">
                      <input type="checkbox" className="instruction-checkbox" />
                      <p className="instruction">{step}</p>
                    </div>
                  ))}
              </div>
              <div className="steps-btn-container">
                <button
                  className="prev-instruction"
                  onClick={() => {
                    switchSteps(-1);
                  }}
                >
                  Previous Step
                </button>
                <button
                  className="next-instruction"
                  onClick={() => {
                    switchSteps(1);
                  }}
                >
                  Next Step
                </button>
              </div>
            </div>
            <div className="ingredients-container">
              <h3>Ingredients</h3>
              <div className="ingredient-list">
                {cookingReceipe &&
                  cookingReceipe.ingredients.map((ingredient) => (
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
            {cookingReceipe && <img className="cook-image" src={image} alt="Dish Image" />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cook;
