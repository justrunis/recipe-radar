import React, { useState, useEffect } from "react";
import RecipeInformation from "./RecipeInformation";
import Rating from "@mui/material/Rating";
import AddRecipeModal from "../Pages/AddRecipeModal";
import Button from "@mui/material/Button";
import { getRecipeImageById } from "../Helpers/databaseRequests";
import { variables } from "../Variables";
import RecipeImage from "./RecipeImage";
import { getUserRole, getUserId } from "../Auth/auth";

export default function Recipe({ recipe, onDelete, onEdit }) {
  const [imageUrl, setImageUrl] = useState(null);

  const userRole = getUserRole(localStorage.getItem("jwtToken"));
  const currentUserId = getUserId(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (!recipe || !recipe.id) return;

    const fetchImage = async () => {
      try {
        const URL = variables.API_URL + "recipeImage/" + recipe.id;
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
  }, [recipe]);

  const deleteRecipe = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name} recipe?`
    );
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <article className="recipe-container col-4">
      <h2 className="recipe-name">{recipe.name}</h2>
      <RecipeImage recipe={recipe} imageUrl={imageUrl} />
      <div className="recipe-detail-container">
        <h4 className="recipe-category">Recipe category: {recipe.category}</h4>
      </div>
      <RecipeInformation
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
      />
      <h2 className="recipe-category">Difficulty</h2>
      <Rating value={recipe.difficulty} disabled />
      {userRole === variables.SUPER_ROLE ||
      currentUserId === recipe?.user_id ? (
        <div className="button-container">
          <AddRecipeModal mode="edit" recipe={recipe} onEdit={onEdit} />
          <button
            variant="contained"
            className="remove-button"
            onClick={() => deleteRecipe(recipe.id, recipe.name)}
          >
            Remove
          </button>
        </div>
      ) : null}
    </article>
  );
}
