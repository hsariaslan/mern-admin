import mongoose, { Model, Schema } from 'mongoose';
import IRole from "../interfaces/role";

const RoleSchema: Schema<IRole> = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, required: true },
    permissions: { type: [String], required: true },
});

const RoleModel: Model<IRole> = mongoose.model<IRole>('Role', RoleSchema);

export default RoleModel;