import mongoose from "mongoose";
import { IResponse } from "./responses-group.interface";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: string;
    image?: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    disabled?: boolean;
}

export interface IGetUser {
    name: string;
    email: string;
    role: string;
    token?: string;
};

export interface IGetUserResponse extends IResponse {
    data: IGetUser;
}

export interface ILoginParams {
    email: string;
    password: string;
}

export interface IGetUsersParams {
    search?: string;
    from?: number;
    limit?: number;
}

export interface IGetUsersResponse {
    data: IUser[];
    total: number;
    page?: number;
}