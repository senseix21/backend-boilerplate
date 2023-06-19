"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const cow_model_1 = require("../cows/cow.model");
const user_model_1 = require("../users/user.model");
const order_model_1 = require("./order.model");
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start a transaction session
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        // Extract the buyer and cow IDs from the order data
        const { buyer, cow } = orderData;
        // Get the buyer's information
        const buyerInfo = yield user_model_1.User.findById(buyer).session(session);
        if (!buyerInfo) {
            throw new Error('Buyer not found');
        }
        // Get the cow's information
        const cowInfo = yield cow_model_1.Cow.findById(cow).session(session);
        if (!cowInfo) {
            throw new Error('Cow not found');
        }
        // Check if the buyer has enough money
        if (buyerInfo.budget < cowInfo.price) {
            throw new Error('Insufficient funds');
        }
        // Update the cow's status to 'sold out'
        cowInfo.label = 'sold out';
        yield cowInfo.save();
        // Deduct the cost of the cow from the buyer's budget
        buyerInfo.budget -= cowInfo.price;
        yield buyerInfo.save();
        // Update the seller's income by adding the cow's price
        const seller = yield user_model_1.User.findById(cowInfo.seller).session(session);
        if (!seller) {
            throw new Error('Seller not found');
        }
        seller.income += cowInfo.price;
        yield seller.save();
        // Create the order entry
        const createdOrder = yield order_model_1.Order.create(orderData);
        // Populate the buyer and cow fields with the updated data
        const populatedOrder = yield createdOrder
            .populate('buyer');
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return populatedOrder;
    }
    catch (error) {
        // Abort the transaction if any error occurs
        throw new ApiError_1.default(402, 'Error creating order');
    }
});
//get all orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
exports.OrderService = { createOrder, getAllOrders };
