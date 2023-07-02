import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
import bcrypt from 'bcrypt'
import config from "../../../config";

const AdminSchema = new Schema<IAdmin>({

    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['admin'],
        required: true
    },
    password: {
        type: String,
        required: true,
        select: 0
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
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);



AdminSchema.statics.isAdminExist = async function (
    phoneNumber: string
): Promise<Pick<IAdmin, 'id' | 'phoneNumber' | 'password' | 'role'>> {
    return await this.findOne(
        { phoneNumber },
        { phoneNumber: 1, password: 1, role: 1 }
    ).exec();
};


AdminSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

// Admin.create() / Admin.save()
AdminSchema.pre('save', async function (next) {
    // hashing Admin password
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bycrypt_salt_rounds)
    );
    next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);



