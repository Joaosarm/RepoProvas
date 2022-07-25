import * as testRepository from "../repositories/testRepository.js"
import { CreateTestData } from "../repositories/testRepository";


export async function createTest(testData : CreateTestData){
    await testRepository.insert(testData);
}

export async function getTestsByTerm(){
    return await testRepository.findByTerm();
}

export async function getTestsByTeacher(){
    return await testRepository.findByTeacher();
}