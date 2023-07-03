import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin, ILoginAdmin, ILoginAdminResponse } from "./admin.interface";
import config from "../../../config";
import { Admin } from "./admin.model";
import { Secret } from "jsonwebtoken"
import { jwtHelpers } from "../../../helpers/jwthelpers";


//Create a Admin
const createAdmin = async (admin: IAdmin): Promise<IAdmin> => {
    const result = await Admin.create(admin);
    return result;
};


//get My Profile
const getMyProfile = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findById(id, { name: 1, phoneNumber: 1, address: 1 });
    return result;
};

//Update My Profile
const updateMyProfile = async (id: string, upatedData: Partial<IAdmin>): Promise<IAdmin | null> => {
    const result = await Admin.findByIdAndUpdate(id, upatedData, { new: true, name: 1, phoneNumber: 1, address: 1 });
    return result;
};

//LOgin Admin
const loginAdmin = async (payload: ILoginAdmin): Promise<ILoginAdminResponse> => {
    const { phoneNumber, password } = payload;
    // console.log(phoneNumber, password);

    const isAdminExist = await Admin.isAdminExist(phoneNumber);
    // console.log(isAdminExist);

    if (!isAdminExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
    }

    if (
        isAdminExist.password &&
        !(await Admin.isPasswordMatched(password, isAdminExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }

    //create access token & refresh token

    const { id: userId, role } = isAdminExist;
    const accessToken = jwtHelpers.createToken(
        { userId, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        { userId, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};

export const AdminService = {
    createAdmin,
    loginAdmin,
    getMyProfile,
    updateMyProfile
}