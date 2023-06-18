import { IUser } from "./user.interface";
import { User } from "./user.model";


const createUser = async (user: IUser): Promise<IUser> => {
    const createdUser = await User.create(user);
    return createdUser;
}

export const UserService = {
    createUser,

}