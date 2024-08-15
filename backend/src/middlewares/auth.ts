import {RequestHandler} from "express";
import * as Errors from "../errors";

export const authMiddleware: RequestHandler = (req, res, next): void => {
    if (req.session.userId) {
        next();
    } else {
        next(Errors.userIsNotAuthenticated());
    }
}