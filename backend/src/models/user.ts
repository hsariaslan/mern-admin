import {InferSchemaType, model, Schema} from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    roles: { type: Array, required: true },
    permissions: { type: Array, required: true },
});

type User = InferSchemaType<typeof userSchema>

export default model <User>("User", userSchema);