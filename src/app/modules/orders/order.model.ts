import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cow: {
        type: Schema.Types.ObjectId,
        ref: 'Cow',
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},
    {
        timestamps: true
    }
);

export const Order = model<IOrder>('Order', orderSchema);