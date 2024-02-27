import React, { useState } from "react";
import Section from "./Section";
import Tabs from "./Tabs";
import TabButton from "./TabButton";
import IngredientsTab from "./IngredientsTab";
import InstructionsTab from "./InstructionsTab";

export default function RecipeInformation({ ingredients, instructions }) {
  const [selectedTab, setSelectedTab] = useState(null);

  function handleSelect(selectedTab) {
    setSelectedTab((prevSelectedTab) =>
      prevSelectedTab === selectedTab ? null : selectedTab
    );
  }

  return (
    <Section id="more">
      <Tabs
        selectedTab={selectedTab}
        buttons={
          <>
            <TabButton
              isSelected={selectedTab === "ingredients"}
              onClick={() => handleSelect("ingredients")}
            >
              Ingredients
            </TabButton>
            <TabButton
              isSelected={selectedTab === "instructions"}
              onClick={() => handleSelect("instructions")}
            >
              Instructions
            </TabButton>
          </>
        }
      >
        {!selectedTab ? (
          <p>Select a tab to view more information</p>
        ) : (
          <>
            {selectedTab === "ingredients" && (
              <IngredientsTab ingredients={ingredients} />
            )}
            {selectedTab === "instructions" && (
              <InstructionsTab instructions={instructions} />
            )}
          </>
        )}
      </Tabs>
    </Section>
  );
}
