import { Request, Response } from 'express';
import productsData from '../utils/mockData/product.mock.json';

export const getProducts = (_req: Request, res: Response) => {
    res.send({
        data: productsData,
        status: 200
    });
};