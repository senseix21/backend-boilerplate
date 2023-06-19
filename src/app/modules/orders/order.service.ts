import { Cow } from "../cows/cow.model";
import { User } from "../users/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError";


const createOrder = async (orderData: IOrder | any): Promise<IOrder> => {
    try {
        // Start a transaction session
        const session = await mongoose.startSession();
        session.startTransaction();

        // Extract the buyer and cow IDs from the order data
        const { buyer, cow } = orderData;

        // Get the buyer's information
        const buyerInfo = await User.findById(buyer).session(session);
        if (!buyerInfo) {
            throw new Error('Buyer not found');
        }

        // Get the cow's information
        const cowInfo = await Cow.findById(cow).session(session);
        if (!cowInfo) {
            throw new Error('Cow not found');
        }

        // Check if the buyer has enough money
        if (buyerInfo.budget < cowInfo.price) {
            throw new Error('Insufficient funds');
        }

        // Update the cow's status to 'sold out'
        cowInfo.label = 'sold out';
        await cowInfo.save();

        // Deduct the cost of the cow from the buyer's budget
        buyerInfo.budget -= cowInfo.price;
        await buyerInfo.save();

        // Update the seller's income by adding the cow's price
        const seller = await User.findById(cowInfo.seller).session(session);
        if (!seller) {
            throw new Error('Seller not found');
        }

        seller.income += cowInfo.price;
        await seller.save();

        // Create the order entry
        const createdOrder = await Order.create(orderData)

        // Populate the buyer and cow fields with the updated data
        const populatedOrder = await createdOrder
            .populate('buyer')

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return populatedOrder;

    } catch (error) {
        // Abort the transaction if any error occurs
        throw new ApiError(402, 'Error creating order');
    }
};

//get all orders
const getAllOrders = async (): Promise<IOrder[]> => {
    const result = await Order.find()
    return result;
}

export const OrderService = { createOrder, getAllOrders }