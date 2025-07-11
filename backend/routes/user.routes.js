import { Router } from "express";
import { loginUser, signupUser, logoutUser, updateAccountDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/signup", signupUser)
router.post("/login", loginUser)

// secured routes
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/update-details').patch(verifyJWT, updateAccountDetails)
export default router