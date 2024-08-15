import UserModel from "../../models/user";
import IUser from "../../interfaces/user";
import * as Errors from "../../errors";

export default async (usernameParam: string, {username, email, password, roles, permissions}: IUser, confirm_password: string): Promise<IUser | null> => {
    if (!usernameParam || !username || !email || !roles || !permissions) {
        throw Errors.missingParam();
    }

    if (password !== confirm_password) {
        throw Errors.passwordsDoesntMatch();
    }

    const user: IUser | null = await UserModel.findOne({ username: usernameParam }).exec();

    if (!user) {
        throw Errors.userNotFound();
    }

    if (username !== user.username) {
        const existingUsername: IUser | null = await UserModel.findOne({ _id: {$ne: user._id}, username: username }).exec();

        if (existingUsername) {
            throw Errors.usernameAlreadyExists();
        }
    }

    if (email !== user.email) {
        const existingEmail: IUser | null = await UserModel.findOne({ _id: {$ne: user._id}, email: email }).exec();

        if (existingEmail) {
            throw Errors.emailAlreadyExists();
        }
    }

    return await UserModel.findOne({ _id: user._id }).exec();
}