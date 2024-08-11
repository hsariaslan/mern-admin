import {RequestHandler} from "express";
import createHttpError from "http-errors";

export const authMiddleware: RequestHandler = (req, res, next): void => {
    if (req.session.userId) {
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
}