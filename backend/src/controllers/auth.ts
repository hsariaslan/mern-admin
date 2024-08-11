import {NextFunction, RequestHandler} from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import * as AuthInterfaces from "../interfaces/auth";
import {signUpValidation} from "../validations/auth/signUp";
import {loginValidation} from "../validations/auth/login";

export const getAuthenticatedUser: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const signUp: RequestHandler<unknown, unknown, AuthInterfaces.SignUpInterface, unknown> = async(req, res, next: NextFunction): Promise<void> => {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const confirm_password: string = req.body.confirm_password;

    try {
        await signUpValidation({username, email, password, confirm_password});

        const passwordHashed: string = await bcrypt.hash(password, 12);
        const newUser = await UserModel.create({
            username,
            email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

export const login: RequestHandler<unknown, unknown, AuthInterfaces.LoginInterface, unknown> = async (req, res, next: NextFunction): Promise<void> => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    try {
        const user = await loginValidation({username, password});

        req.session.userId = user._id;
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