import UserModel from "../../models/user";
import {ISignUp} from "../../interfaces/auth";
import IUser from "../../interfaces/user";
import * as Errors from "../../errors";

export const signUpValidation = async ({username, email, password, confirm_password}: ISignUp): Promise<boolean> => {
    if (!username || !email || !password || !confirm_password) {
        throw Errors.missingParam();
    }

    if (password !== confirm_password) {
        throw Errors.passwordsDoesntMatch();
    }

    const existingUsername: IUser | null = await UserModel.findOne({ username: username }).exec();

    if (existingUsername) {
        throw Errors.usernameAlreadyExists();
    }

    const existingEmail: IUser | null = await UserModel.findOne({ email: email }).exec();

    if (existingEmail) {
        throw Errors.emailAlreadyExists();
    }

    return true;
}