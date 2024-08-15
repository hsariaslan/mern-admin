import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./util/validateEnv";
import AuthRoutes from "./routes/auth";
import UserRoutes from "./routes/users";
import * as Errors from "./errors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION
    })
}));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use((req, res, next: NextFunction) => {
    next(Errors.endpointNotFound());
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction): void => {
    console.error(error);
    let errorMessage: string = Errors.unknownErrorMessage;
    let statusCode: number = Errors.unknownErrorStatusCode;

    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }

    res.status(statusCode).json({ error: errorMessage });
});

export default app;