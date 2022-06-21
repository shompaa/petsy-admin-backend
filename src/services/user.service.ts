import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";
import { generateToken } from "../utils";

export const getUsers = async (_req: Request, res: Response) => {
    const users = await User.find({}, 'name email role');
    res.json({
        status: 200,
        data: users,
    });
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const existentUser = await User.findOne({ email });

        if (existentUser) {
            return res.status(400).json({
                status: 400,
                message: `${email} already exists`,
            });
        }

        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        await user.save();
        const token = await generateToken(user);
    
        return res.json({
            status: 200,
            message: 'User created successfully',
            data: {
                user,
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

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userDB = await User.findById(id);
        if(!userDB) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }
        const {password, role, email, ...params} = req.body;
        
        if(userDB.email != email) {
            const existentUser = await User.findOne({ email });
            if (existentUser) {
                return res.status(400).json({
                    status: 400,
                    message: `${email} already exists`
                });
            }
        }

        params.email = email;
        const user = await User.findByIdAndUpdate(id, params, { new: true });

        return res.json({
            status: 200,
            message: 'User updated successfully',
            data: user
        });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userDB = await User.findById(id);
        if(!userDB) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }
        await User.findByIdAndDelete(id);
        return res.json({
            status: 200,
            message: `${userDB.email} deleted successfully`
        });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
}