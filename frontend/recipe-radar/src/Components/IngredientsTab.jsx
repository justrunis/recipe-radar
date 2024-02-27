import React from "react";

const IngredientsTab = ({ ingredients }) => (
  <ul className="tab-content">
    {ingredients.map((ingredient, index) => (
      <li key={index}>
        {ingredient.amount} {ingredient.name}
        {ingredient.type && ` (${ingredient.type})`}
      </li>
    ))}
  </ul>
);

export default IngredientsTab;
