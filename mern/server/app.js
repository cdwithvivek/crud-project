import express from "express";
import env from "dotenv";
import connectDB from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
env.config();
//config env file
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_URL_2 = process.env.DATABASE_URL_2;
//datbase connection
connectDB(DATABASE_NAME, DATABASE_URL_2);

// express instance
const app = express();

//pasring json and form
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//using static file if necessary

//routing setup
app.use("/", userRoutes);

//listening
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
