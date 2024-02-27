import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Recipe from "../Components/Recipe";
import { data } from "../DATA";
import Footer from "../Components/Footer";
import { Pagination } from "@mui/material";
import AddRecipeModal from "./AddRecipeModal";
import { ToastContainer, toast } from "react-toastify";
import { makePostRequest } from "../Helpers/databaseRequests";
import axios from "axios";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allRecipes, setAllRecipes] = useState(data.recipes);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = allRecipes.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  async function AddRecipe(
    recipeName,
    recipeImage,
    recipeCategory,
    ingredients,
    instructions
  ) {
    instructions = instructions.split("\n"); // Create into array of instructions
    console.log(recipeImage);
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
    setAllRecipes([
      ...allRecipes,
      {
        name: recipeName,
        image: recipeImage,
        category: recipeCategory,
        ingredients: ingredients,
        instructions: instructions,
      },
    ]);
    const data = new FormData();
    data.append("file", recipeImage);
    console.log(data);
    axios.post("http://localhost:4000/api/saveImage", data).then((res) => {
      console.log(res);
    });
    // const URL = "http://localhost:4000/api/saveImage";
    // makePostRequest(URL, { image: data });
    toast.success("Recipe added successfully!");
  }

  return (
    <div>
      <Header />
      <AddRecipeModal
        onSave={(recipe) =>
          AddRecipe(
            recipe.recipeName,
            recipe.image,
            recipe.recipeCategory,
            recipe.ingredients,
            recipe.instructions
          )
        }
      />
      <div className="recipes-container">
        {currentRecipes.map((meal) => (
          <Recipe key={meal.id} meal={meal} />
        ))}
      </div>
      <div className="pager">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          size="large"
        />
      </div>
      <Footer />
    </div>
  );
}
