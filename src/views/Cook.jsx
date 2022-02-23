import React, { useState, useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { selectCookingrecipe, selectIngredients } from "../features/recipeSlice";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Nav from "../views/Nav";

function Cook() {
  const cookingrecipe = useSelector(selectCookingrecipe);
  const { name, image } = cookingrecipe;

  // use displayList array that only stores 5 strings and update it each time next step or previous step is clicked
  const [instructionBatch, setInstructionBatch] = useState([[]]);
  const [ingredientsFormatted, setIngredientsFormatted] = useState([]);
  const [batchIndex, setBatchIndex] = useState(0);

  const formatBatch = () => {
    let tempArray = [];
    let tempInArray = [];

    for (let i = 0; i < cookingrecipe.steps.length; i++) {
      //So if we have 5 instructions we add the array into array [[1,2,3,5],]
      if (i !== 0 && i % 5 === 0) {
        tempArray.push(tempInArray);
        tempInArray = [];
      }
      //Checks if we've reached end of the array to store the last batch.
      if (i === cookingrecipe.steps.length - 1) {
        tempArray.push(tempInArray);
        setInstructionBatch(tempArray);
      }

      //Fills up the temp batch with the 5 instructions
      let formattedStep = cookingrecipe.steps[i];
      formattedStep = formattedStep[0].toUpperCase() + formattedStep.slice(1, formattedStep.length) + ".";
      console.log(formattedStep);

      tempInArray.push(formattedStep);
    }

    let tempIngredients = [];
    cookingrecipe.ingredients.forEach((ingredient) => {
      let formattedIngredient = ingredient;

      formattedIngredient =
        formattedIngredient[0].toUpperCase() + formattedIngredient.slice(1, ingredient.length);
      tempIngredients.push(formattedIngredient);
    });
    setIngredientsFormatted(tempIngredients);
  };

  const switchSteps = (val) => {
    let tempIndex = batchIndex;
    if (tempIndex + val > instructionBatch.length - 1 || tempIndex + val < 0) {
      return;
    }
    setBatchIndex(batchIndex + val);
    resetCheckBox();
  };

  useEffect(() => {
    formatBatch();
  }, []);

const resetCheckBox = ()=>{
  let inputs = document.querySelectorAll('.checkbox');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].checked = false;
}
}

  return (
    <>
      <Nav />
      <div className="cook-container">
        {cookingrecipe.name === undefined ? (
          <div className="no-cooking-recipe">
            <h1>
              No recipe Selected to Cook. <br /> Try browsing our menu!
            </h1> 
          </div>
        ) : (
          <div className="cook-header">
            <div className="cook-content-container">
              <div className="instructions-container">
                <h1 className="cook-recipe-name">{name.toUpperCase()}</h1>
                <h3 className="instructions-title">Instructions</h3>
                {/* INSTRUCTIONS */}
                <div className="instruction-batch">
                  {cookingrecipe &&
                    instructionBatch[batchIndex].map((step,i) => (
                      <div className="instruction-item" key={i}>
                        <input id="checkbox" type="checkbox" className="checkbox instruction-checkbox" />
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
                  {cookingrecipe &&
                    ingredientsFormatted.map((ingredient) => (
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
              {cookingrecipe && <img className="cook-image" src={image} alt="Dish Image" />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cook;
