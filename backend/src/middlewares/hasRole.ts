import {RequestHandler} from "express";
import * as Errors from "../errors";

export default function hasRole(role: string): RequestHandler {
    return (req, res, next) => {
        if (!req.session.roles?.includes("admin") && !req.session.roles?.includes(role)) {
            next(Errors.userIsNotAuthorized());
        } else {
            next();
        }
    }
}