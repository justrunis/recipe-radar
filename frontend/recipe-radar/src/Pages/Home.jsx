import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Recipe from "../Components/Recipe";
// import { data } from "../DATA";
import Footer from "../Components/Footer";
import { Pagination } from "@mui/material";
import AddRecipeModal from "./AddRecipeModal";
import { ToastContainer, toast } from "react-toastify";
import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makePatchRequest,
} from "../Helpers/databaseRequests";
import axios from "axios";
import { variables } from "../Variables";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [allRecipes, setAllRecipes] = useState(data.recipes);
  const [allRecipes, setAllRecipes] = useState([]);
  console.log(allRecipes);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = allRecipes.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  async function getAllRecipes() {
    const URL = variables.API_URL + "getAllRecipes";
    const data = await makeGetRequest(URL);
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const allRecipes = await getAllRecipes();

        setAllRecipes(allRecipes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  async function AddRecipe(
    recipeName,
    recipeDifficulty,
    recipeImage,
    recipeCategory,
    ingredients,
    instructions
  ) {
    instructions = instructions.split("\n");

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
    const URL = variables.API_URL + "addRecipe";
    const result = await makePostRequest(URL, {
      name: recipeName,
      difficulty: recipeDifficulty,
      image: recipeImage,
      category: recipeCategory,
      ingredients: ingredients,
      instructions: instructions,
    });
    setAllRecipes([...allRecipes, result.result]);
    // const data = new FormData();
    // data.append("file", recipeImage);
    // console.log(data);
    // axios.post("http://localhost:4000/api/saveImage", data).then((res) => {
    //   console.log(res);
    // });
    // const URL = "http://localhost:4000/api/saveImage";
    // makePostRequest(URL, { image: data });
    toast.success(`${recipeName} recipe added successfully!`);
  }

  async function deleteRecipe(id) {
    const URL = variables.API_URL + "deleteRecipe/" + id;
    const response = await makeDeleteRequest(URL);
    if (response) {
      const updatedRecipes = allRecipes.filter((recipe) => recipe.id !== id);
      setAllRecipes(updatedRecipes);
      toast.success("Recipe deleted successfully!");
    }
  }

  async function editRecipe(recipe) {
    const URL = variables.API_URL + "editRecipe";
    const result = await makePatchRequest(URL, recipe);
    const index = allRecipes.findIndex((r) => r.id === recipe.id);
    const updatedRecipes = [...allRecipes];
    updatedRecipes[index] = result.result;
    setAllRecipes(updatedRecipes);
    toast.success("Recipe updated successfully!");
  }

  return (
    <div>
      <Header />
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
