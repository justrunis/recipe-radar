import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
// import db from "./database.js";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

dotenv.config();

const app = express();
const port = 4000;
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
let upload = multer({ dest: "images/" });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

/**
 * Function to make database queries
 * @param {*} sql query string
 * @param {*} params query parameters
 * @returns query result
 */
async function query(sql, params) {
  const client = await db.connect();
  try {
    // remove the logs later
    if (params) {
      console.log("SQL:", sql, params);
      return await client.query(sql, params);
    } else {
      console.log("SQL:", sql);
      return await client.query(sql);
    }
  } finally {
    client.release();
  }
}

/// get all recipes with ingredients and instructions
app.get("/getAllRecipes", async (req, res) => {
  const recipes = await query("SELECT * FROM recipes");
  const ingredients = await query("SELECT * FROM ingredients");
  const instructions = await query("SELECT * FROM instructions");

  const combinedRecipes = recipes.rows.map((recipe) => {
    const recipeIngredients = ingredients.rows.filter(
      (ingredient) => ingredient.recipe_id === recipe.id
    );
    const recipeInstructions = instructions.rows.filter(
      (instruction) => instruction.recipe_id === recipe.id
    );

    return {
      ...recipe,
      ingredients: recipeIngredients,
      instructions: recipeInstructions,
    };
  });

  res.json(combinedRecipes);
});

app.post("/addRecipe", async (req, res) => {
  try {
    console.log(req.body);
    const { name, category, difficulty, image, ingredients, instructions } =
      req.body;

    const data = await query(
      "INSERT INTO recipes (name, category, difficulty) VALUES ($1, $2, $3) RETURNING id",
      [name, category, difficulty]
    );
    const recipeId = data.rows[0].id;

    for (const ingredient of ingredients) {
      await query(
        "INSERT INTO ingredients (recipe_id, name, amount, type) VALUES ($1, $2, $3, $4)",
        [recipeId, ingredient.name, ingredient.amount, ingredient.type]
      );
    }

    for (const [index, instruction] of instructions.entries()) {
      await query(
        "INSERT INTO instructions (recipe_id, step_number, instruction) VALUES ($1, $2, $3)",
        [recipeId, index + 1, instruction]
      );
    }

    // Get all instructions for the added recipe
    const allInstructions = await query(
      "SELECT * FROM instructions WHERE recipe_id = $1",
      [recipeId]
    );

    res.json({
      message: "Recipe added successfully",
      instructions: allInstructions.rows,
    });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: "Failed to add recipe" });
  }
});

app.delete("/deleteRecipe/:id", async (req, res) => {
  const id = req.params.id;

  // Delete ingredients
  await query("DELETE FROM ingredients WHERE recipe_id = $1", [id]);

  // Delete instructions
  await query("DELETE FROM instructions WHERE recipe_id = $1", [id]);

  // Delete recipe
  await query("DELETE FROM recipes WHERE id = $1", [id]);

  res.json({ message: "Recipe deleted successfully" });
});

app.patch("/editRecipe", async (req, res) => {
  console.log(req.body);
  const id = req.body.ingredients[0].recipe_id;
  console.log(id);
  const { recipeName, recipeCategory, difficulty, ingredients, instructions } =
    req.body;
  console.log(
    recipeName,
    recipeCategory,
    difficulty,
    ingredients,
    instructions
  );
  await query(
    "UPDATE recipes SET name = $1, category = $2, difficulty = $3 WHERE id = $4",
    [recipeName, recipeCategory, difficulty, id]
  );

  await query("DELETE FROM ingredients WHERE recipe_id = $1", [id]);
  for (const ingredient of ingredients) {
    await query(
      "INSERT INTO ingredients (recipe_id, name, amount, type) VALUES ($1, $2, $3, $4)",
      [id, ingredient.name, ingredient.amount, ingredient.type]
    );
  }
  const newInstructions = instructions.split("\n");
  console.log(newInstructions);
  await query("DELETE FROM instructions WHERE recipe_id = $1", [id]);
  for (let i = 0; i < newInstructions.length; i++) {
    const instruction = newInstructions[i];
    await query(
      "INSERT INTO instructions (recipe_id, step_number, instruction) VALUES ($1, $2, $3)",
      [id, i + 1, instruction]
    );
  }
});

app.post("/api/saveImage", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.json({ file: file });
});

app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;

  res.sendFile(`${__dirname}/images/${filename}`);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
