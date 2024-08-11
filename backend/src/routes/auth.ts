import {Router} from "express";
import * as AuthController from "../controllers/auth";
import {authMiddleware} from "../middlewares/auth";

const router: Router = Router();

router.get("/", authMiddleware, AuthController.getAuthenticatedUser);
router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;