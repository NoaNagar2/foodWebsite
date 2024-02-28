import configDotEnv from "./config";
import express, { json } from "express";
import { notFound } from "./middleware/not-found";
import { connect } from "./database/connection";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";
import { workshopsRouter } from "./routes/workshop";
import { recipeRouter } from "./routes/recipe";
import { usersRouter } from "./routes/user";
import nodemailer from "nodemailer";

configDotEnv();
connect();

const app = express();

app.use(cors());

app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/workshop", workshopsRouter);
app.use("/api/v1/recipe", recipeRouter);
app.use(express.static("/api/v1/public"));
app.use(errorHandler);
app.use(notFound);

app.listen(8080);
