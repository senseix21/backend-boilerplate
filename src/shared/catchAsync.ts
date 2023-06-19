import { NextFunction, Request, RequestHandler, Response } from 'express';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';


const catchAsync =
    (fn: RequestHandler) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid Request'));
            }
        }



export default catchAsync;
