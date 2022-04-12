import express from "express";
import UserController from "../controllers/userController.js";
const router = express.Router();

router.get('/',UserController.home)
router.get('/registration',UserController.registration)
router.get('/login',UserController.login)
router.post('/registration',UserController.createUserDoc)
router.post('/login',UserController.verifyLogin)
export default router;