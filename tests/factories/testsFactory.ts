import { faker } from "@faker-js/faker";

export const testTemplate = {
    name: faker.datatype.string(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    teacherDisciplineId: 1
};

