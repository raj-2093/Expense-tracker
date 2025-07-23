import { Router } from "express";
import { loginHandler, logoutHandler, registerHandler, verifyToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerHandler)
router.route("/login").post(loginHandler)
router.route("/logout").post(verifyJWT, logoutHandler)
router.route("/verifyToken").get(verifyToken)

export default router;