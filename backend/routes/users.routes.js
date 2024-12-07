import { Router } from "express";
import { signUp,login } from "../controllers/auth.controller.js";

const router = Router()

router.route("/user").post(signUp)
router.route("/login").post(login)


export default router;