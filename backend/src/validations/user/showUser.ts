import {Types} from "mongoose";
import createHttpError from "http-errors";
import UserModel from "../../models/user";
import IUser from "../../interfaces/user";

export default async (id: string): Promise<IUser | null> => {
    if (!id) {
        throw createHttpError(400, "Parameters are missing");
    }

    const regexp: RegExp = /[0-9A-Fa-f]{6}/g;

    if (id.length != 24 || !regexp.test(id)) {
        throw createHttpError(400, "Wrong id");
    }

    const _id: Types.ObjectId = new Types.ObjectId(id);
    const user: IUser | null = await UserModel.findOne({ _id: _id }).exec();

    if (!user) {
        throw createHttpError(404, "User not found");
    }

    return user;
}