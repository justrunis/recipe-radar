import React, { useState } from "react";
import Header from "../Components/Header";
import Recipe from "../Components/Recipe";
import Footer from "../Components/Footer";
import { Pagination } from "@mui/material";
import AddRecipeModal from "./AddRecipeModal";
import { toast } from "react-toastify";
import {
  makePostRequest,
  makeDeleteRequest,
  makePatchRequest,
} from "../Helpers/databaseRequests";
import axios from "axios";
import { variables } from "../Variables";
import RecipeFilters from "../Components/RecipeFilters";
import { useQuery } from "react-query";
import { queryClient } from "../App";

const invalidate = async () => {
  await queryClient.invalidateQueries({
    queryKey: ["allRecipes"],
  });
};

export default function Home({ token }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [filter, setFilter] = useState({
    category: "",
    difficulty: 0,
    search: "",
  });

  let { data: allRecipes } = useQuery({
    queryKey: ["allRecipes", filter.category, filter.difficulty, filter.search],
    queryFn: () =>
      fetch(
        variables.API_URL +
          "getAllRecipes?" +
          new URLSearchParams({
            category: filter.category,
            difficulty: filter.difficulty,
            search: filter.search,
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      ).then((res) => res.json()),
    staleTime: 10 * (60 * 1000), // 10 mins
  });
  if (!allRecipes) {
    allRecipes = [];
  }

  const totalPages = Math.ceil(allRecipes.length / itemsPerPage);
  const currentRecipes = allRecipes.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  async function AddRecipe(
    recipeName,
    recipeDifficulty,
    recipeImage,
    recipeCategory,
    ingredients,
    instructions
  ) {
    instructions = instructions.split("\n");

    const formData = new FormData();
    formData.append("file", recipeImage);

    if (recipeName === "") {
      toast.error("Please enter a recipe name!");
      return;
    }
    if (recipeCategory === "") {
      toast.error("Please select a category!");
      return;
    }
    if (ingredients.length <= 0) {
      toast.error("Please provide at least one ingredient!");
      return;
    }
    if (instructions.length <= 0) {
      toast.error("Please provide at least one instruction!");
      return;
    }

    try {
      const res = await axios.post(variables.API_URL + "saveImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }

    const URL = variables.API_URL + "addRecipe";
    const result = await makePostRequest(URL, {
      name: recipeName,
      difficulty: recipeDifficulty,
      category: recipeCategory,
      ingredients: ingredients,
      instructions: instructions,
    });

    const recipeId = result.result.id;
    formData.append("recipeId", recipeId);

    try {
      const res = await axios.post(variables.API_URL + "saveImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }

    invalidate();

    toast.success(`${recipeName} recipe added successfully!`);
  }

  async function deleteRecipe(id) {
    const URL = variables.API_URL + "deleteRecipe/" + id;
    const response = await makeDeleteRequest(URL);
    if (response) {
      invalidate();
      toast.success("Recipe deleted successfully!");
    }
  }

  async function editRecipe(recipe) {
    const URL = variables.API_URL + "editRecipe";
    const result = await makePatchRequest(URL, recipe);
    const index = allRecipes.findIndex((r) => r.id === recipe.id);
    const updatedRecipes = [...allRecipes];
    updatedRecipes[index] = result.result;

    const formData = new FormData();
    formData.append("file", recipe.image);
    formData.append("recipeId", recipe.id);

    try {
      const res = await axios.post(variables.API_URL + "saveImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }

    invalidate();
    toast.success("Recipe updated successfully!");
  }

  async function handleCategoryFilterChange(event) {
    setCurrentPage(1);
    setFilter({ ...filter, category: event.target.value });
  }

  async function handleDifficultyFilterChange(event) {
    setCurrentPage(1);
    setFilter({
      ...filter,
      difficulty:
        +event.target.value == filter.difficulty ? 0 : +event.target.value,
    });
  }

  async function handleSearchFilterChange(event) {
    setCurrentPage(1);
    setFilter({ ...filter, search: event.target.value });
  }

  return (
    <>
      <Header token={token} />
      <main>
        <RecipeFilters
          filter={filter}
          onCategoryChange={handleCategoryFilterChange}
          onDifficultyChange={handleDifficultyFilterChange}
          onSearchChange={handleSearchFilterChange}
        />
        <AddRecipeModal
          onSave={(recipe) =>
            AddRecipe(
              recipe.recipeName,
              recipe.difficulty,
              recipe.image,
              recipe.recipeCategory,
              recipe.ingredients,
              recipe.instructions
            )
          }
        />
        <div className="recipes-container">
          {currentRecipes.map((meal) => (
            <Recipe
              key={meal.id}
              meal={meal}
              onDelete={(id) => deleteRecipe(id)}
              onEdit={(recipe) => editRecipe(recipe)}
            />
          ))}
          {currentRecipes.length === 0 && (
            <div className="no-recipes">
              <h2>No recipes found!</h2>
            </div>
          )}
        </div>
      </main>
      <div className="pager">
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
            size="large"
          />
        )}
      </div>
      <Footer />
    </>
  );
}
