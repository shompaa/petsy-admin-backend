import { Schema, model } from "mongoose";
import { IUser } from "../utils";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    }
});

userSchema.methods.toJSON = function () {
    const { __v, _id, password, ...object} = this.toObject();
    object.id = _id;
    return object;
}

export const User = model<IUser>("User", userSchema);