import { Purchase } from "../models";
import { IPurchase, IPurchaseDetail } from "../utils";
import { updateStock } from "./product.service";

export const findAll = async (): Promise<IPurchase[]> => {
    return await Purchase.find({});
}

export const findById = async (id: string): Promise<IPurchase> => {
    try {
        const purchase = await Purchase.findById(id);
        if (!purchase) {
            throw new Error("Purchase not found");
        }
        return purchase;
    } catch (error) {
        throw error;
    }
}

export const findByInvoiceNumber = async (invoiceNumber: string): Promise<IPurchase> => {
    try {
        const purchase = await Purchase.findOne({ invoiceNumber });
        if (!purchase) {
            throw new Error("Purchase not found");
        }
        return purchase;
    } catch (error) {
        throw error;
    }
}

export const create = async (purchase: IPurchase): Promise<IPurchase> => {
    try {
        const newPurchase = new Purchase(purchase);
        newPurchase.details.map(({ productId, quantity }: IPurchaseDetail) => {
            updateStock(productId?.id!, quantity);
        });
        await newPurchase.save();
        return newPurchase;
    } catch (error) {
        throw error;
    }
}

export const update = async (id: string, purchase: IPurchase): Promise<IPurchase> => {
    try {
        const purchaseDB = findById(id);
        if(!purchaseDB) {
            throw new Error("Purchase not found");
        }
        const updatedPurchase = await Purchase.findOneAndUpdate({ id }, purchase, { new: true });
        return updatedPurchase || purchaseDB;
    } catch (error)  {
        throw error;
    }
}

export const remove = async (id: string): Promise<IPurchase> => {
    try {
        const purchaseDB = findById(id);
        if(!purchaseDB) {
            throw new Error("Purchase not found");
        }
        const deletedPurchase = await Purchase.findByIdAndDelete({ id });
        return deletedPurchase || purchaseDB;
    } catch (error) {
        throw error;
    }
}