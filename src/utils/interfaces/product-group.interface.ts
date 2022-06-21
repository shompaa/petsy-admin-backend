export interface IProduct {
    sku: string;
    name: string;
    description: string;
    salePrice: number;
    costPrice: number;
    stock: number;
    images?: IImage[];
}

export interface IImage {
    url: string;
    alt: string;
}

export interface IGetProduct extends IProduct {};