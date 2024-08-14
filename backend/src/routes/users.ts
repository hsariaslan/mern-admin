import {Router} from "express";
import * as UsersController from "../controllers/users";
import {authMiddleware} from "../middlewares/auth";

const router: Router = Router();

router.get("/", authMiddleware, UsersController.index);
router.post("/create", authMiddleware, UsersController.create);
router.get("/:id", authMiddleware, UsersController.show);
router.put("/update", authMiddleware, UsersController.update);
router.delete("/delete", authMiddleware, UsersController.deleteUser);

export default router;