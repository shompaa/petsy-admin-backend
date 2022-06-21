import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid password'
            });
        }
        const token = await generateToken(user);        
        return res.json({
            status: 200,
            message: 'User logged in successfully',
            data: {
                token
            }
        });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
}