import React, { useState, useEffect } from "react";
import RecipeInformation from "./RecipeInformation";
import Rating from "@mui/material/Rating";
import AddRecipeModal from "../Pages/AddRecipeModal";
import Button from "@mui/material/Button";
import { getRecipeImageById } from "../Helpers/databaseRequests";
import { variables } from "../Variables";
import RecipeImage from "./RecipeImage";
import { getUserRole, getUserId } from "../Auth/auth";

export default function Recipe({ meal, onDelete, onEdit }) {
  const [imageUrl, setImageUrl] = useState(null);

  const userRole = getUserRole(localStorage.getItem("jwtToken"));
  const currentUserId = getUserId(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (!meal || !meal.id) return;

    const fetchImage = async () => {
      try {
        const URL = variables.API_URL + "recipeImage/" + meal.id;
        const image = await getRecipeImageById(URL);
        if (image) {
          const imageUrl = window.URL.createObjectURL(image);
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
    <article className="meal-container col-4">
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
      {userRole === variables.SUPER_ROLE || currentUserId === meal?.user_id ? (
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
      ) : null}
    </article>
  );
}
