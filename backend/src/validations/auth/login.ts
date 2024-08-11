import createHttpError from "http-errors";
import UserModel from "../../models/user";
import {LoginInterface} from "../../interfaces/auth";
import bcrypt from "bcrypt";

export const loginValidation = async ({username, password}: LoginInterface) => {
    if (!username || !password) {
        throw createHttpError(400, "Parameters are missing");
    }

    const user = await UserModel.findOne({ username }).select("+password +email").exec();

    if (!user) {
        throw createHttpError(401, "Invalid credentials");
    }

    const arePasswordsMatch: boolean = await bcrypt.compare(password, user.password);

    if (!arePasswordsMatch) {
        throw createHttpError(401, "Invalid credentials");
    }

    return user;
}