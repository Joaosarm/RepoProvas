import { Request, Response } from "express";
import * as testServices from "../services/testServices.js"


export async function createTest(req: Request, res: Response) {
    const data = req.body;
    await testServices.createTest(data);
    res.sendStatus(201);
}

export async function getTestsByTerm(req: Request, res: Response){
    const tests = await testServices.getTestsByTerm();
    res.status(200).send(tests);
}

export async function getTestsByTeacher(req: Request, res: Response){
    const tests = await testServices.getTestsByTeacher();
    res.status(200).send(tests);
}