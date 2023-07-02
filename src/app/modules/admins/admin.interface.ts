/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IAdmin = {
    id: string;
    phoneNumber: string;
    role: 'admin';
    password: string;
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
};

export type ILoginAdmin = {
    phoneNumber: string;
    password: string;
};

export type ILoginAdminResponse = {
    accessToken: string;
    refreshToken?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};


// export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type AdminModel = {
    isAdminExist(phoneNumber: string): Promise<Pick<IAdmin, 'id' | 'phoneNumber' | 'password' | 'role'>>;

    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
} & Model<IAdmin>;