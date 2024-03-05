import { variables } from "../Variables";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";
import Input from "@mui/material/Input";

export default function RecipeFilters({
  filter,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
}) {
  return (
    <>
      <div className="filter-container">
        <h4>Filters</h4>
        <div style={{ width: "200px" }}>
          <label htmlFor="recipe-category-input">Recipe Category</label>
          <FormControl fullWidth margin="dense">
            <InputLabel
              htmlFor="recipe-category-input"
              sx={{ textAlign: "center" }}
            >
              Recipe Category
            </InputLabel>
            <Select
              id="recipe-category-input-filter"
              onChange={onCategoryChange}
              value={filter.category}
            >
              <MenuItem value="">All</MenuItem>
              {variables.CATAGORIES.map(({ strCategory }) => (
                <MenuItem key={strCategory} value={strCategory}>
                  {strCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <label htmlFor="difficulty-input">Difficulty</label>
          <FormControl fullWidth margin="dense">
            <Rating
              name="difficulty"
              value={filter.difficulty}
              max={5}
              onChange={onDifficultyChange}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="search-input">Search</InputLabel>
            <Input
              id="search-input"
              variant="filled"
              onChange={onSearchChange}
            />
          </FormControl>
        </div>
      </div>
    </>
  );
}
