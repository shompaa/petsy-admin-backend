import express from 'express';
import { check } from 'express-validator';
import { 
    addProduct, 
    deleteProduct, 
    getProduct, 
    getProducts, 
    updateProduct 
} from '../controllers';
import { JWTValidation, Validation } from '../middlewares';

const router = express.Router();

router.get('/', getProducts);

router.get('/:sku', getProduct);

router.post('/',
    [
        JWTValidation,
        check('sku', 'Sku is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('salePrice', 'Sale price is required').not().isEmpty(),
        check('costPrice', 'Cost price is required').not().isEmpty(),
        check('stock', 'Stock is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        Validation,
    ],
    addProduct
);

router.put('/:sku',
    [
        JWTValidation,
        check('sku', 'Sku is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('salePrice', 'Sale price is required').not().isEmpty(),
        check('costPrice', 'Cost price is required').not().isEmpty(),
        check('stock', 'Stock is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        Validation
    ],
    updateProduct
);

router.delete('/:sku', JWTValidation, deleteProduct); 

export default router;