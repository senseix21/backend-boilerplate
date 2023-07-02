import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
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


UserSchema.statics.isUserExist = async function (
    phoneNumber: string
): Promise<Pick<IUser, '_id' | 'phoneNumber' | 'password' | 'role'>> {
    return await this.findOne(
        { phoneNumber },
        { phoneNumber: 1, password: 1, role: 1 }
    ).exec();
};


UserSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
    // hashing Users password
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bycrypt_salt_rounds)
    );
    next();
});



export const User = model<IUser, UserModel>("User", UserSchema);
