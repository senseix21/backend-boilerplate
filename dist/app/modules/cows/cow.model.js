"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = exports.cowSchema = void 0;
const mongoose_1 = require("mongoose");
exports.cowSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});
exports.Cow = (0, mongoose_1.model)('Cow', exports.cowSchema);
