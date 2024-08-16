import {Router} from "express";
import * as AuthController from "../controllers/auth";
import {authMiddleware} from "../middlewares/auth";
import hasPermission from "../middlewares/hasPermission";

const router: Router = Router();

router.get("/", [authMiddleware, hasPermission('get_authenticated_user')], AuthController.getAuthenticatedUser);
router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;