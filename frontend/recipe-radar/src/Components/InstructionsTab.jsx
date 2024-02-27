import React from "react";

const InstructionsTab = ({ instructions }) => (
  <ol className="tab-content">
    {instructions.map((instruction, index) => (
      <li key={index}>{instruction}</li>
    ))}
  </ol>
);

export default InstructionsTab;
