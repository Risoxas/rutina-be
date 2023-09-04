import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router: Router = Router();

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.post("/reset-password", UserController.resetPassword);
router.post("/update-password", UserController.updatePassword)

export default router;