import mongoose, { Document } from 'mongoose';

interface IRole extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    order: number;
    permissions: string[];
}

export default IRole;
