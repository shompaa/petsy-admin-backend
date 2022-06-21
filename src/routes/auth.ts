import express from 'express';
import { check } from 'express-validator';
import { Validation } from '../middlewares';
import { login } from '../services';

const router = express.Router();

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        Validation
    ],
    login
);

export default router;
