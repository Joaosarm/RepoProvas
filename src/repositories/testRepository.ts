import { tests } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateTestData = Omit<tests, "id">;

export async function insert(TestData: CreateTestData) {
    await prisma.tests.create({ data: TestData });
}

export async function findByTerm() {
    return await prisma.terms.findMany({
        select: {
            disciplines: {
                select: {
                    name: true,
                    termId: true,
                    teachersDisciplines: {
                        select: {
                            teachers: {
                                select: {
                                    name: true
                                }
                            },
                            tests: {
                                select: {
                                    name: true,
                                    pdfUrl: true,
                                    categories: { select: { name: true } },
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}

export async function findByTeacher() {
    return await prisma.teachers.findMany({
        select: {
            name: true,
            teachersDisciplines: {
                select: {
                    disciplines: {
                        select: {
                            name: true
                        }
                    },
                    tests: {
                        select: {
                            name: true,
                            pdfUrl: true,
                            categories: {
                                select: {
                                    name: true
                                }
                            },
                        },
                    },
                    
                },
            },
        },
    });
}