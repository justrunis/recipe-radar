import React from "react";
import RecipeInformation from "./RecipeInformation";

export default function Recipe({ meal }) {
  if (!meal) return null; // Handle case where meal is undefined

  return (
    <div className="meal-container">
      <h2 className="meal-name">{meal.name}</h2>
      <img
        className="meal-image"
        src="https://static.thenounproject.com/png/1092638-200.png"
        alt=""
      />
      <div className="meal-detail-container">
        <h4 className="meal-category">Meal country: {meal.category}</h4>
      </div>
      <RecipeInformation
        ingredients={meal.ingredients}
        instructions={meal.instructions}
      />
    </div>
  );
}
