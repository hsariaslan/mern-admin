import {RequestHandler} from "express";
import * as Errors from "../errors";

export default function hasPermission(permission: string): RequestHandler {
    return (req, res, next) => {
        if (!req.session.roles?.includes("admin") && !req.session.permissions?.includes(permission)) {
            next(Errors.userIsNotAuthorized());
        } else {
            next();
        }
    }
}