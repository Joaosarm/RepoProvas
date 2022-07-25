import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { prisma } from "../../src/config/database.js";

export const createUserTemplate = () => {
    const password = faker.internet.password()
    const body = {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password,
    };
    return body;
}

export async function createUser() {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password().toString(),
    };

    await prisma.users.create({
        data: {
            email: user.email,
            password: bcrypt.hashSync(user.password, 10),
        },
    });

    return {
        email: user.email,
        password: user.password
    };
}