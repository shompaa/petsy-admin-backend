import express from 'express';
import { check } from 'express-validator';
import {
    addPurchase,
    deletePurchase,
    getPurchase,
    getPurchases,
    updatePurchase
} from '../controllers';
import { JWTValidation, Validation } from '../middlewares';

const router = express.Router();

router.get('/', getPurchases);
router.get('/:purchaseNumber', getPurchase);
router.post('/',
    [
        JWTValidation,
        check('total', 'Total is required').not().isEmpty(),
        Validation,
    ],
    addPurchase
);
router.put('/:id',
    [
        JWTValidation,
        check('total', 'Total is required').not().isEmpty(),
        Validation,
    ],
    updatePurchase
);
router.delete('/:id', JWTValidation, deletePurchase);

