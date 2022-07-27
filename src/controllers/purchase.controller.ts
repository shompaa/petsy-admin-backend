import { NextFunction, Request, Response } from "express";
import { create, findAll, findById, remove, update } from "../services/purchase.service";

export const getPurchases = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await findAll();
        return res.json({
            status: 200,
            data: purchases,
        });
    } catch (e) {
        next(e);
        return;
    }
}

export const getPurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { purchaseNumber } = req.params;
        const purchase = await findById(purchaseNumber);
        return res.json({
            status: 200,
            data: purchase,
        });
    } catch (e) {
        next(e);
        return;
    }
}

export const addPurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchase = await create(req.body);
        return res.json({
            status: 200,
            message: 'Purchase created successfully',
            data: purchase,
        });
    } catch (e) {
        next(e);
        return;
    }
}

export const updatePurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const purchase = await update(id, req.body);
        return res.json({
            status: 200,
            message: 'Purchase updated successfully',
            data: purchase,
        });
    } catch (e) {
        next(e);
        return;
    }
}

export const deletePurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await remove(id);
        return res.json({
            status: 200,
            message: `Purchase deleted successfully`
        });
    } catch (e) {
        next(e);
        return
    }
}
