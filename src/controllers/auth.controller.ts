import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/auth.service"; 
import { ILoginParams } from "../utils";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await loginService(req.body as ILoginParams);
        return res.json({
            status: 200,
            message: 'User logged in successfully',
            data: resp
        });
    } catch (e) {
        next(e);
        return;
    }
}