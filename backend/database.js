import pg from "pg";
import dbConfig from "./config/db.config.js";
const { Pool } = pg;

const db = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
});

export default db;
