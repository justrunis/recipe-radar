import React from "react";

const InstructionsTab = ({ instructions }) => (
  <ol className="tab-content">
    {instructions
      .sort((a, b) => a.step_number - b.step_number)
      .map((instruction, index) => (
        <li key={index}>{instruction.instruction}</li>
      ))}
  </ol>
);

export default InstructionsTab;
