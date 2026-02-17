import { Router } from "express";
import * as US from "./user.service.js"
const router= Router()


router.post("/signup" , US.signup)
router.post("/login" , US.login)
router.get("/profile/:id", US.getProfile)







export default router