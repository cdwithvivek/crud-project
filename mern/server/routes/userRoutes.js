import express from 'express'
import { middleware } from '../middleware/authMiddleware.js'
import userController from '../controller/userController.js'
const userRoutes = express.Router()

userRoutes.get('/',userController.home)
userRoutes.post('/register',userController.registerUser)
userRoutes.post('/signin',userController.userLogin)

export default userRoutes