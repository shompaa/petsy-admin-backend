import express from 'express';
import { check } from 'express-validator';
import { Validation, JWTValidation } from '../middlewares';
import { addUser, deleteUser, getUsers, updateUser } from '../services';

const router = express.Router();

router.get('/', JWTValidation ,getUsers );
router.post('/',
    [
        JWTValidation,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        Validation,
    ] ,
    addUser
);
router.put('/:id', 
    [
        JWTValidation,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('role', 'role is required').not().isEmpty(),
        Validation
    ], 
    updateUser
);
router.delete('/:id',JWTValidation, deleteUser);

export default router;
