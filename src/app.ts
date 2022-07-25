import cors from "cors"
import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";

import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import router from "./routers/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);


export default app;