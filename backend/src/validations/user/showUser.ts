import createHttpError from "http-errors";
import UserModel from "../../models/user";
import IUser from "../../interfaces/user";

export default async (username: string): Promise<IUser | null> => {
    if (!username) {
        throw createHttpError(400, "Parameters are missing");
    }

    const user: IUser | null = await UserModel.findOne({ username: username }).exec();

    if (!user) {
        throw createHttpError(404, "User not found");
    }

    return user;
}