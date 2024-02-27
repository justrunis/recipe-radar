import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { variables } from "../Variables";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { saveAs } from "file-saver";
import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const defaultIngredients = [
  { name: "", amount: "", type: "", error: { name: false, amount: false } },
];

export default function AddRecipeModal({
  onSave,
  onEdit,
  mode = "add",
  recipe,
}) {
  const [open, setOpen] = useState(false);
  const [recipeName, setRecipeName] = useState(recipe ? recipe.name : "");
  const [image, setImage] = useState();
  const [difficulty, setDifficulty] = useState(recipe ? recipe.difficulty : 0);
  const [recipeCategory, setRecipeCategory] = useState(
    recipe ? recipe.category : ""
  );
  const [ingredients, setIngredients] = useState(
    recipe
      ? recipe.ingredients.map((ingredient) => {
          return {
            ...defaultIngredients[0],
            ...ingredient,
          };
        })
      : defaultIngredients
  );
  console.log(recipe);
  const [instructions, setInstructions] = useState(
    recipe
      ? recipe.instructions
          .map((instruction) => {
            return instruction.instruction;
          })
          .join("\n")
      : ""
  );
  const [showError, setShowError] = useState({
    name: false,
    category: false,
    instructions: false,
  });

  useEffect(() => {
    if (mode === "edit" && recipe) {
      setRecipeName(recipe.name);
      setDifficulty(recipe.difficulty);
      setRecipeCategory(recipe.category);
      // setIngredients(recipe.ingredients);
      // setInstructions(recipe.instructions);
    }
  }, [mode, recipe]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;

    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients[index].error[name] = !value.length;
      updatedIngredients[index][name] = value;
      return updatedIngredients;
    });
  };

  const handleNameChange = (event) => {
    setShowError((prevShowError) => ({
      ...prevShowError,
      name: !event.target.value.length,
    }));
    setRecipeName(event.target.value);
  };

  const handleRatingChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setShowError((prevShowError) => ({
      ...prevShowError,
      category: !event.target.value.length,
    }));
    setRecipeCategory(event.target.value);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", amount: "", type: "", error: { name: false, amount: false } },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const list = [...ingredients];
    list.splice(index, 1);
    setIngredients(list);
  };

  const handleInstructionsChange = (event) => {
    setShowError((prevShowError) => ({
      ...prevShowError,
      instructions: !event.target.value.length,
    }));
    setInstructions(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSaveRecipe = () => {
    let hasError =
      !recipeName.length || !recipeCategory.length || !instructions.length;

    for (const ingredient of ingredients) {
      if (ingredient.name.length === 0 || ingredient.amount.length === 0) {
        hasError = true;
      }
    }

    if (hasError) return;
    if (mode === "edit") {
      onEdit({
        id: recipe?.id,
        recipeName,
        difficulty,
        image,
        recipeCategory,
        ingredients,
        instructions,
      });
    } else {
      onSave({
        recipeName,
        difficulty,
        image,
        recipeCategory,
        ingredients,
        instructions,
      });
      setRecipeName("");
      setDifficulty(0);
      setImage("");
      setRecipeCategory("");
      setIngredients(defaultIngredients);
      setInstructions("");
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        className={mode === "edit" ? "" : "ml-3 mt-3"}
        style={{
          textTransform: "uppercase",
          marginLeft: mode === "edit" ? "0" : "1.5rem",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        {mode === "edit" ? "Edit" : "Add recipe"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add Recipe
          </Typography>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="recipe-name-input">Recipe Name</InputLabel>
            <Input
              id="recipe-name-input"
              value={recipeName}
              onChange={handleNameChange}
            />
            {showError.name && (
              <Typography color="error" variant="caption">
                Name field cannot be empty!
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Input
              id="recipe-image-input"
              type="file"
              onChange={handleImageChange}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="recipe-category-input">
              Recipe Category
            </InputLabel>
            <Select
              id="recipe-category-input"
              value={recipeCategory}
              onChange={handleCategoryChange}
            >
              {variables.CATAGORIES.map((category) => (
                <MenuItem
                  key={category.strCategory}
                  value={category.strCategory}
                >
                  {category.strCategory}
                </MenuItem>
              ))}
            </Select>
            {showError.category && (
              <Typography color="error" variant="caption">
                Category field cannot be empty!
              </Typography>
            )}
          </FormControl>
          <Typography variant="subtitle1">Difficulty:</Typography>
          <FormControl fullWidth margin="dense">
            <Rating
              name="difficulty"
              defaultValue={0}
              max={5}
              onChange={handleRatingChange}
              value={difficulty}
            />
          </FormControl>
          <Typography variant="subtitle1">Ingredients:</Typography>
          {ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: "flex", gap: "8px" }}>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor={`ingredient-name-input-${index}`}>
                  Name
                </InputLabel>
                <Input
                  id={`ingredient-name-input-${index}`}
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
                {ingredient.error.name && (
                  <Typography color="error" variant="caption">
                    Name field cannot be empty!
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor={`ingredient-amount-input-${index}`}>
                  Amount
                </InputLabel>
                <Input
                  id={`ingredient-amount-input-${index}`}
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
                {ingredient.error.amount && (
                  <Typography color="error" variant="caption">
                    Amount field cannot be empty!
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel htmlFor={`ingredient-type-input-${index}`}>
                  Type
                </InputLabel>
                <Input
                  id={`ingredient-type-input-${index}`}
                  name="type"
                  value={ingredient.type}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
              </FormControl>
              <IconButton
                onClick={() => handleRemoveIngredient(index)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button variant="outlined" onClick={handleAddIngredient}>
            <AddIcon />
          </Button>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="instructions-input">Instructions</InputLabel>
            <Input
              id="instructions-input"
              multiline
              rows={4}
              value={instructions}
              onChange={handleInstructionsChange}
            />
            {showError.instructions && (
              <Typography color="error" variant="caption">
                Instructions field cannot be empty!
              </Typography>
            )}
          </FormControl>
          <Button variant="contained" onClick={handleSaveRecipe}>
            Save Recipe
          </Button>
        </Box>
      </Modal>
    </>
  );
}
