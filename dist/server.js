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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("./errors/ApiError"));
process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});
let server;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.database_url);
        console.log("Database connection established successfully!");
        app_1.default.listen(config_1.default.port, () => {
            console.log("App listening on port " + config_1.default.port);
        });
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid request from server');
    }
});
process.on('unhandledRejection', error => {
    if (server) {
        server.close(() => {
            console.error(error);
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
connectDB();
process.on('SIGTERM', () => {
    console.log('SIGTERM is received');
    if (server) {
        server.close();
    }
});
