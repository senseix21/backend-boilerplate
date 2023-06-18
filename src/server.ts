import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import httpStatus from 'http-status'
import { logger } from "./shared/logger";
import ApiError from "./errors/ApiError";



const connectDB = async () => {
    try {
        await mongoose.connect(config.database_url as string)
        logger.info("Database connection established successfully!");

        app.listen(config.port, () => {
            logger.info("App listening on port " + config.port);
        })

    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid request from server');
    }
}
connectDB();