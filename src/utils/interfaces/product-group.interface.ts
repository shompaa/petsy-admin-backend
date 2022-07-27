export interface IProduct {
    sku: string;
    name: string;
    description: string;
    salePrice: number;
    costPrice: number;
    stock: number;
    orderable: boolean;
    disabled: boolean;
    category: string;
    hasVariants: boolean;
    subCategory?: string;
    images?: string[];
    variants?: IVariant[];
    id?: string;
}

export interface IVariant {
    color: TProductColor;
    size: TLetterProductSize | TNumberProductSize;
    quantity: number;
}

type TProductColor = "Rojo"
    | "Rosado"
    | "Morado"
    | "Negro"
    | "Azul"
    | "Plomo"
    | "Celeste"
    | "Verde";

type TLetterProductSize = "XS" | "S" | "M" | "L" | "XL";
type TNumberProductSize = "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20";


export interface IGetProduct extends IProduct { };