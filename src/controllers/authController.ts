import { Request, Response } from "express";
import * as authServices from "../services/authServices.js";


export async function signUp(req: Request, res: Response) {
    const userData = req.body;
    await authServices.signUp(userData);
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const userData = req.body;
    const token = await authServices.signIn(userData);
    res.status(200).send(token);
}