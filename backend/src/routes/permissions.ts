import {Router} from "express";
import * as PermissionsController from "../controllers/permissions";
import {authMiddleware} from "../middlewares/auth";
import hasPermission from "../middlewares/hasPermission";
import hasRole from "../middlewares/hasRole";
import {deletePermission} from "../controllers/permissions";

const router: Router = Router();

router.get("/", [authMiddleware, hasPermission('list_permissions')], PermissionsController.index);
router.post("/create", [authMiddleware, hasRole('admin')], PermissionsController.create);
router.get("/:slug", [authMiddleware, hasPermission('show_permission')], PermissionsController.show);
router.patch("/:slug/update", [authMiddleware, hasRole('admin')], PermissionsController.update);
router.delete("/:slug/delete", [authMiddleware, hasRole('admin')], PermissionsController.deletePermission);

export default router;