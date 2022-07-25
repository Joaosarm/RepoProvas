import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authUtils from "../utils/authUtils.js";
import * as authRepository from "../repositories/authRepository.js"
import { CreateUserData } from "../repositories/authRepository.js";

export async function signUp(userData : CreateUserData){
    const {email, password} = userData;
    await authUtils.checkUserExistance(email);
    const encryptedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_KEY));
    await authRepository.insert({email, password: encryptedPassword});
}

export async function signIn(userData : CreateUserData){
    const {email, password} = userData;
    const user = await authUtils.getUser(email);
    await authUtils.checkPassword(password, user.password);
    const token = jwt.sign(`${user.id}`, process.env.JWT_SECRET as string);
    return token;
}