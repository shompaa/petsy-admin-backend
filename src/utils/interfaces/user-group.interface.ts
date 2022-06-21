import { IImage } from "./product-group.interface";
import { IResponse } from "./responses-group.interface";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    image?: IImage;
    id?: string;
}

export interface IGetUser {
    name: string;
    email: string;
    role: string;
};

export interface IGetUserResponse extends IResponse {
    data: IGetUser;
}