import createHttpError from "http-errors";
import UserModel from "../../models/user";
import IUser from "../../interfaces/user";

export default async (usernameParam: string, {username, email, password, roles, permissions}: IUser, confirm_password: string): Promise<IUser | null> => {
    if (!usernameParam || !username || !email || !roles || !permissions) {
        throw createHttpError(400, "Parameters are missing");
    }

    if (password !== confirm_password) {
        throw createHttpError(400, "Passwords does not match");
    }

    const user: IUser | null = await UserModel.findOne({ username: usernameParam }).exec();

    if (!user) {
        throw createHttpError(404, "User not found");
    }

    if (username !== user.username) {
        const existingUsername: IUser | null = await UserModel.findOne({ _id: {$ne: user._id}, username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already exists");
        }
    }

    if (email !== user.email) {
        const existingEmail: IUser | null = await UserModel.findOne({ _id: {$ne: user._id}, email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "Email already exists");
        }
    }

    return await UserModel.findOne({ _id: user._id }).exec();
}