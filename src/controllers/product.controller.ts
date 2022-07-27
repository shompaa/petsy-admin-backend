import { 
    NextFunction, 
    Request, 
    Response 
} from 'express';
import { 
    create, 
    findAll, 
    findBySku, 
    remove, 
    update 
} from '../services/product.service';
import { IProduct } from '../utils';

export const getProducts = async (_req: Request, res: Response) => {
    const products: IProduct[] = await findAll();
    return res.json({
        status: 200,
        data: products,
    });
};

export const getProduct = async (req: Request, res: Response) => {
    const { sku } = req.params;
    const product: IProduct = await findBySku(sku);
    return res.json({
        status: 200,
        data: product,
    });
}

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const product: IProduct = await create(req.body);
        return res.json({
            status: 200,
            message: 'Product created successfully',
            data: product,
        });
    } catch (e: any) {
        next(e);
        return;
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product: IProduct = await update(id, req.body);
        return res.json({
            status: 200,
            message: 'Product updated successfully',
            data: product,
        });
        
    } catch (e: any) {
        next(e);
        return;
    }
}

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = remove(id);
        return res.json({
            status: 200,
            message: 'Product deleted successfully',
            data: product,
        });
        
    } catch (e: any) {
        next(e);
        return;
    }
}