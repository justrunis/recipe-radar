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

app.get("/getRecipes", async (req, res) => {
  const data = await query("SELECT * FROM recipes");
  if (data.rowCount == 0) return false;
  res.json(data.rows);
  return data.rows[0];
});

app.get("/getRecipe/:id", async (req, res) => {
  const id = req.params.id;
  const data = await query("SELECT * FROM recipes WHERE id = $1", [id]);
  res.json(data.rows);
  return data.rows[0];
});

app.get("/getIngredients/:id", async (req, res) => {
  const id = req.params.id;
  const data = await query("SELECT * FROM ingredients WHERE recipe_id = $1", [
    id,
  ]);
  res.json(data.rows);
  return data.rows[0];
});

app.get("/getInstructions/:id", async (req, res) => {
  const id = req.params.id;
  const data = await query("SELECT * FROM instructions WHERE recipe_id = $1", [
    id,
  ]);
  res.json(data.rows);
  return data.rows[0];
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
