import { User } from "../models";
import { IUser } from "../utils";
import bcrypt from 'bcrypt';
import { IGetUsersParams, IGetUsersResponse } from '../utils/interfaces/user-group.interface';

export const findAll = async ({ from, limit, search }: IGetUsersParams): Promise<IGetUsersResponse> => {
    const regex = new RegExp(search!, 'i');
    const params = search ? { $or: [{ name: regex }, { email: regex }] } : {};

    console.log(search);
    


    const [users, total] = await Promise.all([
        User.find(params)
            .skip(from!)
            .limit(limit!),
        User.count(),
    ]);

    return {
        data: users,
        total,
    };
}

export const findById = async (id: string): Promise<IUser> => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export const findByEmail = async (email: string): Promise<IUser> => {
    try {
        const regex = new RegExp(email, 'i');
        const user = await User.findOne({ email: regex });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export const create = async (user: IUser): Promise<IUser> => {
    try {
        const { email } = user;
        const existentUser = await User.findOne({ email });   

        if (existentUser) {
            throw new Error(`${email} already exists`);
        }

        const newUser = new User(user);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(newUser.password, salt);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
}

export const update = async (id: string, user: IUser): Promise<IUser> => {
    try {
        const userDB = await User.findById(id);
        if(!userDB) {
            throw new Error("User not found");
        }
        const {password, role, ...params} = user;
        
        if(userDB.email != params.email) {
            const existentUser = await findByEmail(params.email);
            if (existentUser) {
                throw new Error(`${params.email} already exists`);
            }
        }

        const updatedUser = await User.findOneAndUpdate({ id }, params, { new: true });
        return updatedUser || userDB;
    } catch (error)  {
        throw error;
    }
}

export const remove = async (id: string): Promise<IUser> => {
    try {
        const userDB = await findById(id);
        if (!userDB) {
            throw new Error("User not found");
        }
        const deletedUser = await User.findByIdAndUpdate({ id }, { disabled: true, deletedAt: Date.now()}, { new: true });
        return deletedUser || userDB;
    } catch (error) {
        throw error;
    }
}