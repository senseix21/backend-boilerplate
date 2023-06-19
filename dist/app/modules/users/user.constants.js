"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchableFields = exports.excludeFields = exports.updateFields = exports.userType = void 0;
exports.userType = ['seller', 'buyer'];
exports.updateFields = ["phoneNumber", "password", "budget", "income"];
exports.excludeFields = ["name", "_id", "role", "address"];
exports.userSearchableFields = ["name", "_id", "role", "address", "phoneNumber", "password", "budget", "income", 'seller', 'buyer'];
