import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const router: Router = Router();

router.get("/", ClientController.findAll);
router.post("/new", ClientController.create);
router.get("/search", ClientController.search);
router.get("/:id", ClientController.findById);
router.patch("/update", ClientController.update);
router.delete("/:id", ClientController.delete);

export default router;
