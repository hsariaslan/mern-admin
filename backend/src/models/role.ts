import {InferSchemaType, model, Schema} from "mongoose";

const roleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: { type: Array, required: true },
    order: { type: Number, required: true },
});

type Role = InferSchemaType<typeof roleSchema>

export default model <Role>("Role", roleSchema);