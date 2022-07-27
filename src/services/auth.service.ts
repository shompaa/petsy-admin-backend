import bcrypt from 'bcrypt';
import { generateToken, ILoginParams } from "../utils";
import { findByEmail } from "./user.service";

export const loginService = async (params: ILoginParams): Promise<string> => {
    try {
        const { email, password } = params;
        const user = await findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw new Error("Invalid password");
        }
        return await generateToken(user);
    } catch (error) {
        throw error;
    }
}