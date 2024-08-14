import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    roles: string[];
    permissions: string[];
}

export default IUser;
