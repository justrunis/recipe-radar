import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
// import db from "./database.js";
import dotenv from "dotenv";
import pg from "pg";
import fileUpload from "express-fileupload";
const { Pool } = pg;
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "./auth/auth.js";

dotenv.config();

const app = express();
const port = 4000;
const __dirname = path.resolve();
const saltRounds = 10;
const tokenExpirationTime = "24h";

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
app.use(fileUpload());

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
  console.log(req.query);
  const { category, difficulty, search } = req.query;

  const recipes = await query("SELECT * FROM recipes");
  const ingredients = await query("SELECT * FROM ingredients");
  const instructions = await query("SELECT * FROM instructions");

  let combinedRecipes = recipes.rows.map((recipe) => {
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

  if (category) {
    combinedRecipes = combinedRecipes.filter((recipe) => {
      return recipe.category === category;
    });
  }
  if (difficulty && difficulty != 0) {
    combinedRecipes = combinedRecipes.filter((recipe) => {
      return recipe.difficulty === +difficulty;
    });
  }
  if (search) {
    const searchQuery = search.toLowerCase();
    combinedRecipes = combinedRecipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchQuery);
    });
  }

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

    const result = await getRecipeById(recipeId);
    res.json({
      message: "Recipe added successfully",
      result: result,
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

  // Delete image
  const image = await query("SELECT * FROM images WHERE recipe_id = $1", [id]);
  if (image.rows.length > 0) {
    removeImageFromFolder(image.rows[0].filename);
    await query("DELETE FROM images WHERE recipe_id = $1", [id]);
  }

  // Delete recipe
  await query("DELETE FROM recipes WHERE id = $1", [id]);

  res.json({ message: "Recipe deleted successfully" });
});

async function getRecipeById(id) {
  const recipe = await query("SELECT * FROM recipes WHERE id = $1", [id]);
  const ingredients = await query(
    "SELECT * FROM ingredients WHERE recipe_id = $1",
    [id]
  );
  const instructions = await query(
    "SELECT * FROM instructions WHERE recipe_id = $1",
    [id]
  );

  const combinedRecipe = {
    ...recipe.rows[0],
    ingredients: ingredients.rows,
    instructions: instructions.rows,
  };

  return combinedRecipe;
}

app.patch("/editRecipe", async (req, res) => {
  const id = req.body.id;
  const { recipeName, recipeCategory, difficulty, ingredients, instructions } =
    req.body;
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

  const result = await getRecipeById(id);

  res.json({
    message: "Recipe added successfully",
    result: result,
  });
});

function removeImageFromFolder(fileName) {
  const imagePath = `${__dirname}/images/${fileName}`;
  console.log(imagePath);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

/// save image
app.post("/saveImage", (req, res) => {
  console.log(req.body.recipeId);
  console.log(req.files);
  const file = req.files.file; // Assuming the file input field name is "file"

  // Move the file to the desired location
  file.mv(`${__dirname}/images/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save the file" });
    } else {
      const currentImage = await query(
        "SELECT * FROM images WHERE recipe_id = $1",
        [req.body.recipeId]
      );
      if (currentImage.rows.length > 0) {
        removeImageFromFolder(currentImage.rows[0].filename);
        await query(
          "UPDATE images SET filename = $1, filepath = $2, mimetype = $3, size = $4 WHERE recipe_id = $5",
          [
            file.name,
            `/images/${file.name}`,
            file.mimetype,
            file.size,
            req.body.recipeId,
          ]
        );
      } else {
        await query(
          "INSERT INTO images (filename, filepath, mimetype, size, recipe_id) VALUES ($1, $2, $3, $4, $5)",
          [
            file.name,
            `/images/${file.name}`,
            file.mimetype,
            file.size,
            req.body.recipeId,
          ]
        );
      }
      res.json({
        message: "File saved successfully",
      });
    }
  });
});

/// get recipe image
app.get("/recipeImage/:id", async (req, res) => {
  const id = req.params.id;
  const image = await query("SELECT * FROM images WHERE recipe_id = $1", [id]);
  const imagePath =
    image.rows[0]?.filepath || "/images/default/default-image.png";
  console.log(`${__dirname}${imagePath}`);
  res.sendFile(`${__dirname}${imagePath}`);
});

/// REGISTRATION

// Check if email exists
const emailExists = async (email) => {
  const data = await query("SELECT * FROM users WHERE email=$1", [email]);

  if (data.rowCount == 0) return false;
  return data.rows[0];
};

// Check if username exists
const usernameExists = async (username) => {
  const data = await query("SELECT * FROM users WHERE username=$1", [username]);

  if (data.rowCount == 0) return false;
  return data.rows[0];
};

// Check if password matches
async function matchPassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

// Create user
async function createUser(username, email, password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const currentTime = new Date().toISOString();
  const defaultRole = "user";

  const data = await query(
    "INSERT INTO users (username, email, password, created_at, updated_at, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [username, email, hashedPassword, currentTime, currentTime, defaultRole]
  );

  if (data.rowCount == 0) return false;
  return data.rows[0];
}

function generateJWTToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: tokenExpirationTime }
  );
  return token;
}

async function getUserById(id) {
  const data = await query("SELECT * FROM users WHERE id=$1", [id]);
  if (data.rowCount == 0) return false;
  return data.rows[0];
}

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (await emailExists(email)) {
    return res.status(400).json({ error: "Email already exists" });
  }
  if (await usernameExists(username)) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const user = await createUser(username, email, password);
  if (!user) {
    return res.status(500).json({ error: "Failed to register user" });
  }
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await usernameExists(username);

  const meesageText = "Invalid username or password";
  if (!user) return res.status(400).json({ error: meesageText });

  const isMatch = await matchPassword(password, user.password);
  if (!isMatch) return res.status(400).json({ error: meesageText });
  console.log(user);

  const token = generateJWTToken(user);
  console.log(token);

  res.json({ message: "Logged in successfully", token: token });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
