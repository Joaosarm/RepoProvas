import app from "../src/app.js"
import supertest from "supertest"
import { prisma } from "../src/config/database.js"

import { createUser } from "./factories/authFactory.js"
import { testTemplate } from "./factories/testsFactory.js"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users, tests`
})

describe("POST /tests", () => {
    it("should answer status 201 when valid information is sent and authorized", async () => {
        const user = await createUser();
        const token = await supertest(app).post("/signin").send(user); 
        const body = testTemplate;

        const response = await supertest(app)
            .get("/tests")
            .set('authorization', `Bearer ${token.text}`)
            .send(body);
        expect(response.status).toBe(201);

    })

    it("should answer status 401 when valid information is sent but unauthorized", async () => {
        const body = testTemplate;

        const response = await supertest(app).post("/tests").send(body);
        expect(response.status).toBe(401);
    })

    it("should answer status 422 when no information is sent", async () => {
        const response = await supertest(app).post("/tests").send();
        expect(response.status).toBe(422);
    })
})

describe("GET /tests/terms", () => {
    it("should answer 200 when requested with authorization", async () => {
        const user = await createUser();
        const token = await supertest(app).post("/signin").send(user); 

        const response = await supertest(app)
            .get("/tests/terms")
            .set('authorization', `Bearer ${token.text}`);
        expect(response.status).toBe(200);
    })

    it("should answer 401 when requested without authorization", async () => {
        const response = await supertest(app).get("/tests/terms");
        expect(response.status).toBe(401);
    })
})

describe("GET /tests/teachers", () => {
    it("should answer 200 when requested with authorization", async () => {
        const user = await createUser()
        const token = await supertest(app).post("/signin").send(user);

        const response = await supertest(app)
            .get("/tests/terms")
            .set('authorization', `Bearer ${token.text}`);
        expect(response.status).toBe(200);
    })

    it("should answer 401 when requested without authorization", async () => {
        const response = await supertest(app).get("/tests/terms");
        expect(response.status).toBe(401);
    })
})