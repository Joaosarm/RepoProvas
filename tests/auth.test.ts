import supertest from "supertest";

import app from "../src/app.js";
import { createUser, createUserTemplate } from "./factories/authFactory.js";

describe("POST /signup", () => {
    it("should answer status 201 when valid information is sent", async () => {
        const body = createUserTemplate();

        const response = await supertest(app).post("/signup").send(body)
        expect(response.status).toBe(201);
    })

    it("should answer status 409 when email is already in use", async () => {
        const User = await createUser();
        const response = await supertest(app).post("/signup").send({
            email: User.email,
            password: User.password,
            confirmPassword: User.password,
        });
        expect(response.status).toBe(409);
    })

    it("should answer status 422 when sent with missing information", async () => {
        const response = await supertest(app).post("/signup").send();
        expect(response.status).toBe(422);
    })
})

describe("POST  /signin", () => {
    it("should return 200 when credentials are valid", async () => {
        const user = await createUser()
        const response = await supertest(app).post("/signin").send(user);
        expect(response.status).toBe(200);
    })

    it("should answer status 422 when credentials are invalid", async () => {
        const {email,password} = createUserTemplate();
        const response = await supertest(app).post("/signin").send({email,password});
        expect(response.status).toBe(422);
    })

    it("should answer status 422 when sent with missing information", async () => {
        const response = await supertest(app).post("/signin").send();
        expect(response.status).toBe(422);
    })
})