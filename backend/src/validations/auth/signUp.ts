import createHttpError from "http-errors";
import UserModel from "../../models/user";
import {SignUpInterface} from "../../interfaces/auth";

export const signUpValidation = async ({username, email, password, confirm_password}: SignUpInterface): Promise<boolean> => {
    if (!username || !email || !password || !confirm_password) {
        throw createHttpError(400, "Parameters are missing");
    }

    if (password !== confirm_password) {
        throw createHttpError(400, "Passwords does not match");
    }

    const existingUsername = await UserModel.findOne({ username: username }).exec();

    if (existingUsername) {
        throw createHttpError(409, "Username already exists");
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingEmail) {
        throw createHttpError(409, "Email already exists");
    }

    return true;
}