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
        required: true,
        default: ''
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
        required: true,
        default: 0
    },
    orderable: {
        type: Boolean,
        required: true,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
    },
    images: [{
        type: String,
    }],
    disabled: {
        type: Boolean,
        required: true,
        default: false
    },
    hasVariants: {
        type: Boolean,
        required: true,
        default: false
    },
    variants: [{
        color: {
            type: String,
        },
        size: {
            type: String,
        },
        quantity: {
            type: Number,
        }
    }]
});

productSchema.methods.toJSON = function () {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
}

export const Product = model<IProduct>("Product", productSchema);