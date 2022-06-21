import moongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await moongoose.connect(
            process.env.DB_CONNECTION 
            || 'mongodb://localhost/db'
        );
        console.log('DB connection successful');
    } catch (error) {
        console.log(error);
        throw new Error('DB connection failed, check logs');
    }
};