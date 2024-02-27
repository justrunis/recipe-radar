import React from "react";
import RecipeInformation from "./RecipeInformation";
import Rating from "@mui/material/Rating";
import AddRecipeModal from "../Pages/AddRecipeModal";
import Button from "@mui/material/Button";

export default function Recipe({ meal, onDelete, onEdit }) {
  if (!meal) return null;

  const deleteRecipe = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name} recipe?`
    );
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <div className=" col-4 px-2">
      <div className="meal-container">
        <h2 className="meal-name">{meal.name}</h2>
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
        <div className="button-container">
          <AddRecipeModal mode="edit" recipe={meal} onEdit={onEdit} />
          <Button
            variant="contained"
            style={{
              textTransform: "uppercase",
              color: "#fff",
              backgroundColor: "#dc3545",
            }}
            onClick={() => deleteRecipe(meal.id, meal.name)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
