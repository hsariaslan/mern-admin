import createHttpError from "http-errors";
import UserModel from "../../models/user";
import IUser from "../../interfaces/user";

export default async ({_id, username, email, password, roles, permissions}: IUser, confirm_password: string | undefined): Promise<IUser | null> => {
    if (!_id || !username || !email || !roles || !permissions) {
        throw createHttpError(400, "Parameters are missing");
    }

    const regexp: RegExp = /[0-9A-Fa-f]{6}/g;
    const id: string = _id.toString();

    if (id.length != 24 || !regexp.test(id)) {
        throw createHttpError(400, "Wrong id");
    }

    if (password !== confirm_password) {
        throw createHttpError(400, "Passwords does not match");
    }

    const user: IUser | null = await UserModel.findOne({ _id: _id }).exec();

    if (!user) {
        throw createHttpError(404, "User not found");
    }

    if (username !== user.username) {
        const existingUsername: IUser | null = await UserModel.findOne({ _id: {$ne: _id}, username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already exists");
        }
    }

    if (email !== user.email) {
        const existingEmail: IUser | null = await UserModel.findOne({ _id: {$ne: _id}, email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "Email already exists");
        }
    }

    return await UserModel.findOne({ _id: _id }).exec();
}