import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMessage } from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route('/send/:id').post(verifyJWT, upload.single("image"), sendMessage)
router.route('/:id').get(verifyJWT, getMessage)

export default router