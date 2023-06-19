import { Model, Types } from "mongoose";
import { IUser } from "../users/user.interface";
import { ICow } from "../cows/cow.interface";

export type IOrder = {
    buyer: Types.ObjectId | IUser;
    cow: Types.ObjectId | ICow;

}

export type OrderModel = Model<IOrder, Record<string, unknown>>;