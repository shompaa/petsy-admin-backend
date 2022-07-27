import { IProduct } from './product-group.interface';

export interface IPurchaseDetail {
    productId: IProduct;
    quantity: number;
    comments?: string;
}

export interface IPurchase {
    invoiceNumber: string;
    date: Date;
    details: IPurchaseDetail[];
    total: number;
}