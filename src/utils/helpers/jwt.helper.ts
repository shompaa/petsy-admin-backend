import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';

export const generateToken = (user: IUser): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            iat: new Date().getTime()
        };

        jwt.sign(payload, process.env.SECRET_TOKEN!, {
            expiresIn: '12h'
        }, (err, token ) => {
            if (err) {
                reject('Error generating token');
            } else {
                resolve(token as string);
            }
        });
    });
}
