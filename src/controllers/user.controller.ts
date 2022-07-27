import { NextFunction, Request, Response } from "express";
import {
    create, 
    findAll, 
    findById, 
    remove, 
    update
} from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
    const from: number = Number(req.query.from) || 0;
    const limit:number = Number(req.query.limit) || 5;
    const search:string = req.params.search?.toString() || "";
    const {data, total} = await findAll({ from, limit, search });
    
    res.json({
        status: 200,
        data,
        total,
    });
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await findById(id);
    res.json({
        status: 200,
        data: user,
    });
}


export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await create(req.body);
        return res.json({
            status: 200,
            message: 'User created successfully',
            data: user
        });
    } catch (e: any) {
        next(e);
        return;
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await update(id, req.body);
        return res.json({
            status: 200,
            message: 'User updated successfully',
            data: user
        });
    } catch (e) {
        next(e);
        return;
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { email } = await remove(id);
        return res.json({
            status: 200,
            message: `${email} deleted successfully`
        });
    } catch (e) {
        next(e);
        return
    }
}