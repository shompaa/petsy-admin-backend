import { Schema, model } from "mongoose";
import { IProduct } from "../utils";

const productSchema = new Schema<IProduct>({
    sku: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    costPrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        }
    }]
});

export const Product = model<IProduct>("Product", productSchema);