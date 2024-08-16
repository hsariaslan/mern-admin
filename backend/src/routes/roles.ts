import {Router} from "express";
import * as RolesController from "../controllers/roles";
import {authMiddleware} from "../middlewares/auth";
import hasPermission from "../middlewares/hasPermission";

const router: Router = Router();

router.get("/", [authMiddleware, hasPermission('list_roles')], RolesController.index);
router.post("/create", [authMiddleware, hasPermission('create_role')], RolesController.create);
router.get("/:slug", [authMiddleware, hasPermission('show_role')], RolesController.show);
router.patch("/:slug/update", [authMiddleware, hasPermission('update_role')], RolesController.update);
router.delete("/:slug/delete", [authMiddleware, hasPermission('delete_role')], RolesController.deleteRole);

export default router;