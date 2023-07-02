/* eslint-disable no-unused-vars */
import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUser = {
    phoneNumber: string;
    password: string;
};

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};

export type IVerifiedLoginUser = {
    userId: string;
    role: ENUM_USER_ROLE;
};


