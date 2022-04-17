import express from "express"
import UserController from "../controller/userController.js"
import checkUserAuth from "../middlewares/auth-middleware.js"
const userRoutes = express.Router()

//Public Routees
userRoutes.post("/register", UserController.userRegistration)
userRoutes.post("/login", UserController.userLogin)
userRoutes.post(
  "/send-reset-password-email",
  UserController.sendUserPasswordResetEmail
)
userRoutes.post("/reset-password/:id/:token", UserController.userPasswordReset)
//Protected Routed
userRoutes.post(
  "/changepassword",
  checkUserAuth,
  UserController.changeUserPassword
)

userRoutes.get("/getDetails", checkUserAuth, UserController.loggedUserDetails)

export default userRoutes
