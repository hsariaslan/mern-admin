import mongoose, { Model, Schema } from 'mongoose';
import IUser from "../interfaces/user";

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    roles: { type: [String], required: true },
    permissions: { type: [String], required: true },
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;