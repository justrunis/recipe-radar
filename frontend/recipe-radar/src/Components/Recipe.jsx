import React, { useState, useEffect } from "react";
import RecipeInformation from "./RecipeInformation";
import Rating from "@mui/material/Rating";
import AddRecipeModal from "../Pages/AddRecipeModal";
import Button from "@mui/material/Button";
import { getRecipeImageById } from "../Helpers/databaseRequests";
import { variables } from "../Variables";
import RecipeImage from "./RecipeImage";

export default function Recipe({ meal, onDelete, onEdit }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!meal || !meal.id) return;

    const fetchImage = async () => {
      try {
        const URL = variables.API_URL + "recipeImage/" + meal.id;
        const image = await getRecipeImageById(URL);
        // console.log("Image Blob:", image);
        if (image) {
          const imageUrl = window.URL.createObjectURL(image);
          console.log("Image URL:", imageUrl);
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [meal]);

  const deleteRecipe = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name} recipe?`
    );
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <article className="meal-container">
      <h2 className="meal-name">{meal.name}</h2>
      <RecipeImage meal={meal} imageUrl={imageUrl} />
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
        <button
          variant="contained"
          className="remove-button"
          onClick={() => deleteRecipe(meal.id, meal.name)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}
