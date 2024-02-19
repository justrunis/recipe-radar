import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Recipe from "../Components/Recipe";
import { variables } from "../Variables";
import { data } from "../DATA";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="recipes-container">
        {data.recipes.map((meal, index) => (
          <Recipe key={index} meal={meal} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
