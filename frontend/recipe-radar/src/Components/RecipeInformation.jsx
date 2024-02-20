import React, { useState } from "react";
import Section from "./Section";
import Tabs from "./Tabs";
import TabButton from "./TabButton";

export default function RecipeInformation({ ingredients, instructions }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  function handleSelect(selectedTab) {
    setSelectedRecipe(selectedTab);
  }

  return (
    <Section id="more">
      <Tabs
        buttons={
          <>
            <TabButton
              isSelected={selectedRecipe === "ingredients"}
              onClick={() => handleSelect("ingredients")}
            >
              Ingredients
            </TabButton>
            <TabButton
              isSelected={selectedRecipe === "instructions"}
              onClick={() => handleSelect("instructions")}
            >
              Instructions
            </TabButton>
          </>
        }
      >
        {!selectedRecipe ? (
          <p>Select a tab to view more information</p>
        ) : (
          <>
            {selectedRecipe === "ingredients" && (
              <ul className="tab-content">
                {ingredients &&
                  ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.amount} {ingredient.name}
                      {ingredient.type && ` (${ingredient.type})`}
                    </li>
                  ))}
              </ul>
            )}
            {selectedRecipe === "instructions" && (
              <>
                <ol className="tab-content">
                  {instructions &&
                    instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                </ol>
              </>
            )}
          </>
        )}
      </Tabs>
    </Section>
  );
}
