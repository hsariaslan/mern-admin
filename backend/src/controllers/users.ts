import {NextFunction, RequestHandler} from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import {ISignUp} from "../interfaces/auth";
import {signUpValidation} from "../validations/auth/signUp";
import updateUserValidation from "../validations/user/updateUser";
import showUserValidation from "../validations/user/showUser";
import IUser from "../interfaces/user";
import {hashPassword} from "../util/hashPassword";

export const index: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const users: IUser[] = await UserModel.find().select("+email").exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const create: RequestHandler<unknown, unknown, ISignUp, unknown> = async (req, res, next: NextFunction): Promise<void> => {
    try {
        await signUpValidation(req.body);

        const newUser: IUser = await createUser(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

export const createUser = async ({username, email, password}: ISignUp): Promise<IUser> => {
    const newUser: IUser = new UserModel({
        username,
        email,
        password : await hashPassword(password),
    });

    await newUser.save();

    return newUser;
}

export const show: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const user: IUser | null = await showUserValidation(req.params.username);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const update: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const user: IUser | null = await updateUserValidation(req.params.username, req.body, req.body.confirm_password);

        if (!user) {
            throw createHttpError(400, "User not found");
        }

        const updatedUser: IUser = await updateUser(user, req.body);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (user: IUser, {username, email, password, roles, permissions}: IUser): Promise<IUser> => {
    user.username = username;
    user.email = email;
    user.roles = roles;
    user.permissions = permissions;

    if (password) {
        user.password = await hashPassword(password);
    }

    return await user.save();
}

export const deleteUser: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
    try {
        const user: IUser | null = await showUserValidation(req.params.username);

        if (!user) {
            throw createHttpError(400, "User not found");
        }

        await UserModel.deleteOne({ _id: user._id }).exec();

        res.status(204).json();
    } catch (error) {
        next(error);
    }
}