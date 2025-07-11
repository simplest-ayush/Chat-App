import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getSidebarUsers } from '../controllers/sidebarUsers.controller.js'
const router = Router();

router.route('/').get(verifyJWT, getSidebarUsers)

export default router