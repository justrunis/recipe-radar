import React from "react";

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
      <div>
        <h4 className="meal-category">Meal country: {meal.category}</h4>
      </div>
      <h4>Ingredients:</h4>
      <ul className="meal-ingredients">
        {meal.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.name}
            {ingredient.type && ` (${ingredient.type})`}
          </li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <ol className="meal-instructions">
        {meal.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}
