import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../../config";
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser>({
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['seller', 'buyer'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
    },
    address: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },

},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    });

UserSchema.pre('save', async function (next) {
    // hashing Users password
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bycrypt_salt_rounds)
    );
    next();
});

export const User: Model<IUser> = model<IUser>("User", UserSchema);
