import express from 'express';
import { getProducts } from '../services';

const router = express.Router();

router.get('/', getProducts);

router.post('/', (_req,res) => {
    res.send('add products!');
});

router.put('/:id', (_req,res) => {
    res.send('update products!');
});

router.delete('/:id', (_req,res) => {
    res.send('delete products!');
});


export default router;