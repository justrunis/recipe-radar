import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
console.log(process.env.DB_PASSWORD + " PASSWORD");

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DB,
  PORT: process.env.DB_PORT,
};

export default dbConfig;
