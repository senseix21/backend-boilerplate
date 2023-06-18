import { NextFunction, Request, RequestHandler, Response } from 'express';
import ApiError from '../errors/ApiError';

const catchAsync =
    (fn: RequestHandler) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(ApiError);
            }
        }



export default catchAsync;
