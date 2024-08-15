import mongoose, { Model, Schema } from 'mongoose';
import IPermission from "../interfaces/permission";

const PermissionSchema: Schema<IPermission> = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
});

const PermissionModel: Model<IPermission> = mongoose.model<IPermission>('Permission', PermissionSchema);

export default PermissionModel;