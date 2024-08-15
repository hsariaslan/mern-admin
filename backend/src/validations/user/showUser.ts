import UserModel from "../../models/user";
import IUser from "../../interfaces/user";
import * as Errors from "../../errors";

export default async (username: string): Promise<IUser | null> => {
    if (!username) {
        throw Errors.missingParam();
    }

    const user: IUser | null = await UserModel.findOne({ username: username }).exec();

    if (!user) {
        throw Errors.userNotFound();
    }

    return user;
}