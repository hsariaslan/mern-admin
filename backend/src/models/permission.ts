import {InferSchemaType, model, Schema} from "mongoose";

const permissionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    order: { type: Number, required: true },
});

type Permission = InferSchemaType<typeof permissionSchema>

export default model <Permission>("Permission", permissionSchema);