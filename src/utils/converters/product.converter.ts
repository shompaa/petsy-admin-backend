import { IGetUser, IUser } from "../interfaces";

export const UserConverter = (userDB: IUser, token: string = ''): IGetUser => {
    return {
        name: userDB.name,
        email: userDB.email,
        role: userDB.role,
        token
    }
}