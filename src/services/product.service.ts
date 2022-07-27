import { Product } from "../models";
import { IProduct } from "../utils";

export const findAll = async (): Promise<IProduct[]> => {
    return await Product.find({});
}

export const findBySku = async (sku: string): Promise<IProduct> => {
    try {
        const product = await Product.findOne({ sku });
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    } catch (error) {
        throw error;
    }
}

export const findById = async (id: string): Promise<IProduct> => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    } catch (error) {
        throw error;
    }
}

export const create = async (product: IProduct): Promise<IProduct> => {
    try {
        const newProduct = new Product(product);
        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw error;
    }
}

export const update = async (id: string, product: IProduct): Promise<IProduct> => {
    try {
        const productDB = await findById(id);
        if (!productDB) {
            throw new Error("Product not found");
        }
        const updatedProduct = await Product.findOneAndUpdate({ id }, product, { new: true });
        return updatedProduct || productDB;
    } catch (error)  {
        throw error;
    }
}

export const remove = async (id: string): Promise<IProduct> => {
    try {
        const productDB = await findById(id);
        if (!productDB) {
            throw new Error("Product not found");
        }
        const deletedProduct = await Product.findByIdAndUpdate({ id }, { disabled: true}, { new: true });
        return deletedProduct || productDB;
    } catch (error) {
        throw error;
    }
}

export const updateStock = async (id: string, quantity: number): Promise<IProduct> => {
    try {
        const productDB = await findById(id);
        if (!productDB) {
            throw new Error("Product not found");
        }
        const stock = productDB.stock - quantity;
        const orderable = stock > 0 ? true : false;
        const updatedProduct = await Product.findByIdAndUpdate(id, { stock, orderable }, { new: true });
        return updatedProduct || productDB;
    } catch (error) {
        throw error;
    }
}
