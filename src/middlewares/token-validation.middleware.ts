import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const JWTValidation = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }

    try {        
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN!);        
        req.body.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }
}