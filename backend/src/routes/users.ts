import {Router} from "express";
import * as UsersController from "../controllers/users";
import {authMiddleware} from "../middlewares/auth";

const router: Router = Router();

router.get("/", authMiddleware, UsersController.index);
router.post("/create", authMiddleware, UsersController.create);
router.get("/:username", authMiddleware, UsersController.show);
router.patch("/:username/update", authMiddleware, UsersController.update);
router.delete("/:username/delete", authMiddleware, UsersController.deleteUser);

export default router;