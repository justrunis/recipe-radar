import { variables } from "../Variables";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";

export default function RecipeFilters({
  filter,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
}) {
  console.log(variables.CATAGORIES);
  return (
    <div className="filter-container">
      <Typography variant="h6">Filters</Typography>
      <FormControl fullWidth margin="dense">
        <InputLabel htmlFor="recipe-category-input">Recipe Category</InputLabel>
        <Select
          id="recipe-category-input"
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
      <FormControl fullWidth margin="dense">
        <Rating
          name="difficulty"
          value={filter.difficulty}
          max={5}
          onChange={onDifficultyChange}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <Input id="search-input" variant="filled" onChange={onSearchChange} />
      </FormControl>
    </div>
  );
}
