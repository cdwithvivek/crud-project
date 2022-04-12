import express from "express"
import { homeController } from "../controller/homeController.js"
import {contactController} from '../controller/contactController.js'
import {skillController} from '../controller/skillController.js'
import {servicesController} from '../controller/servicesController.js'
const router = express.Router()

router.get('/',homeController)
router.get('/services',servicesController)
router.get('/skill',skillController)
router.get('/contact',contactController)

export default router;