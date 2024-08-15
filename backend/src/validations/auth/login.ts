import UserModel from "../../models/user";
import {ILogin} from "../../interfaces/auth";
import bcrypt from "bcrypt";
import IUser from "../../interfaces/user";
import * as Errors from "../../errors";

export const loginValidation = async ({username, password}: ILogin): Promise<IUser> => {
    if (!username || !password) {
        throw Errors.missingParam();
    }

    const user: IUser | null = await UserModel.findOne({ username }).select("+password +email").exec();

    if (!user) {
        throw Errors.invalidCredentials();
    }

    const arePasswordsMatch: boolean = await bcrypt.compare(password, user.password);

    if (!arePasswordsMatch) {
        throw Errors.invalidCredentials();
    }

    return user;
}