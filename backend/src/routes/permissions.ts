import {Router} from "express";
import * as PermissionsController from "../controllers/permissions";
import {authMiddleware} from "../middlewares/auth";

const router: Router = Router();

router.get("/", authMiddleware, PermissionsController.index);
router.post("/create", authMiddleware, PermissionsController.create);
router.get("/:slug", authMiddleware, PermissionsController.show);
router.patch("/:slug/update", authMiddleware, PermissionsController.update);
router.delete("/:slug/delete", authMiddleware, PermissionsController.deleteUser);

export default router;