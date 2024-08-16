import {Router} from "express";
import * as UsersController from "../controllers/users";
import {authMiddleware} from "../middlewares/auth";
import hasPermission from "../middlewares/hasPermission";

const router: Router = Router();

router.get("/", [authMiddleware, hasPermission('list_users')], UsersController.index);
router.post("/create", [authMiddleware, hasPermission('create_user')], UsersController.create);
router.get("/:username", [authMiddleware, hasPermission('show_user')], UsersController.show);
router.patch("/:username/update", [authMiddleware, hasPermission('update_user')], UsersController.update);
router.delete("/:username/delete", [authMiddleware, hasPermission('delete_user')], UsersController.deleteUser);

export default router;