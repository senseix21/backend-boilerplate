import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';


export const cowSchema = new Schema<ICow>({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
