import env from "dotenv";
import connectDb from "./config/connectdb.js";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
//setting up env
env.config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

//instance of express
const app = express();

//setting up database
connectDb(DATABASE_URL, DATABASE_NAME);

//middleware

//setting up cors
app.use(cors());

//json parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//router setup
app.use("/api/user", userRoutes);

//listen
app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
