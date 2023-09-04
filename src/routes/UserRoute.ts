import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router: Router = Router();

router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);

export default router;