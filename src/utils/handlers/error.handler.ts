import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: any, 
    _req: Request, 
    res: Response, 
    _next: NextFunction
) => {
    const error = {...err};
    error.message = err.message;
    if (err.name === 'CastError') {
        error.message = 'Invalid ID';
        error.status = 400;
    }
    if (err.code === 11000) {
        error.message = Object.keys(err.keyValue).map
            (key => `${key} already exists`);
        error.status = 400;
    }
    if (err.name === 'ValidationError') {
        error.message = Object.values(err.errors).map(
            (val: any) => val.message
        );
        error.status = 400;
    }
    return res.status(500).json({
        status: error?.status || 500,
        message: error?.message
    });
}