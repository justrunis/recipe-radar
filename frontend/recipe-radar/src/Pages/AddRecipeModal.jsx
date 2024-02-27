import React, { useState } from "react";
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

export default function AddRecipeModal({ onSave }) {
  const [open, setOpen] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [image, setImage] = useState();
  const [recipeCategory, setRecipeCategory] = useState("");
  const [ingredients, setIngredients] = useState(defaultIngredients);
  const [instructions, setInstructions] = useState("");
  const [showError, setShowError] = useState({
    name: false,
    category: false,
    instructions: false,
  });

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

  const handleCategoryChange = (event) => {
    if (event.target.value.length === 0) {
      setShowError((prevShowError) => ({ ...prevShowError, category: true }));
      setRecipeCategory("");
    } else {
      setShowError((prevShowError) => ({ ...prevShowError, category: false }));
      setRecipeCategory(event.target.value);
    }
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
    setInstructions(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
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

    onSave({
      recipeName,
      image,
      recipeCategory,
      ingredients,
      instructions,
    });

    setRecipeName("");
    setImage("");
    setRecipeCategory("");
    setIngredients(defaultIngredients);
    setInstructions("");
    setOpen(false);
  };

  return (
    <>
      <div className="button-container">
        <Button variant="contained" onClick={handleOpen}>
          Add recipe
        </Button>
      </div>
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
            <InputLabel htmlFor="recipe-category-input">
              Upload Image
            </InputLabel>
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
            {recipeCategory.length === 0 && (
              <Typography color="error" variant="caption">
                Category field cannot be empty!
              </Typography>
            )}
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
            {instructions.length === 0 && (
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
