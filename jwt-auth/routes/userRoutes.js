import express from "express";
import UserController from "../controller/userController.js";
const userRoutes = express.Router()


//Public Routees
userRoutes.post('/register',UserController.userRegistration)
userRoutes.post('/login',UserController.userLogin)
//Protected Routed


export default userRoutes;