import mongoose, { Document } from 'mongoose';

interface IPermission extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
}

export default IPermission;
