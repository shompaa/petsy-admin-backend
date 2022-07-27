import { IProduct } from "./product-group.interface";

export interface IResponse {
    status: number;
    data: any;
    message?: string;
    meta?: any;
}

export interface IProductsResponse extends IResponse {
    data: TProducts;
}

type TProducts = IProduct | IProduct[];