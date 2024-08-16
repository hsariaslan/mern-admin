import {NextFunction, RequestHandler} from "express";
import UserModel from "../models/user";
import * as AuthInterfaces from "../interfaces/auth";
import {loginValidation} from "../validations/auth/login";
import {createUser} from "./users";
import IUser from "../interfaces/user";
import {signUpValidation} from "../validations/auth/signUp";

export const getAuthenticatedUser: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const user: IUser | null = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const signUp: RequestHandler<unknown, unknown, AuthInterfaces.ISignUp, unknown> = async(req, res, next: NextFunction): Promise<void> => {
    try {
        await signUpValidation(req.body);

        const newUser: IUser = await createUser(req.body);

        req.session.userId = newUser._id;
        req.session.roles = newUser.roles;
        req.session.permissions = newUser.permissions;
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

export const login: RequestHandler<unknown, unknown, AuthInterfaces.ILogin, unknown> = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const user: IUser = await loginValidation(req.body);

        req.session.userId = user._id;
        req.session.roles = user.roles;
        req.session.permissions = user.permissions;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
}