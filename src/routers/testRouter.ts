import { Router } from "express";
import { createTest, getTestsByTeacher, getTestsByTerm } from "../controllers/testController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { testSchema } from "../schemas/schemas.js";

const testsRouter = Router();

testsRouter.post("/tests", validateSchema(testSchema), validateToken, createTest);
testsRouter.get("/tests/terms", validateToken, getTestsByTerm);
testsRouter.get("/tests/teachers", validateToken, getTestsByTeacher);

export default testsRouter;