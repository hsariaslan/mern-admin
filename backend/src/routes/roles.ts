import {Router} from "express";
import * as RolesController from "../controllers/roles";
import {authMiddleware} from "../middlewares/auth";

const router: Router = Router();

router.get("/", authMiddleware, RolesController.index);
router.post("/create", authMiddleware, RolesController.create);
router.get("/:slug", authMiddleware, RolesController.show);
router.patch("/:slug/update", authMiddleware, RolesController.update);
router.delete("/:slug/delete", authMiddleware, RolesController.deleteUser);

export default router;