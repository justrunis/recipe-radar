import React from "react";
import RecipeInformation from "./RecipeInformation";
import Rating from "@mui/material/Rating";

export default function Recipe({ meal }) {
  if (!meal) return null;

  function getRandomNumber(from, to) {
    return Math.floor(Math.random() * to) + from;
  }

  return (
    <div className=" col-4 px-2">
      <div className="meal-container">
        <h2 className="meal-name">{meal.name}</h2>
        {console.log(meal.image)}
        <img
          className="meal-image"
          src={
            meal.image
              ? URL.createObjectURL(meal.image)
              : "./images/default-image.png"
          }
          alt={`${meal.name} image`}
        />
        <div className="meal-detail-container">
          <h4 className="meal-category">Meal category: {meal.category}</h4>
        </div>
        <RecipeInformation
          ingredients={meal.ingredients}
          instructions={meal.instructions}
        />
        <h2 className="meal-category">Difficulty</h2>
        <Rating value={meal.difficulty} disabled />
      </div>
    </div>
  );
}
