import express, { Express } from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler } from "@secshop/common";

import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";

const app: Express = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
    secure: false,
  })
);


app.get("/health", (req, res) => {
        res.status(200).json({ status: "auth service healthy"});
})

// app.use(currentUser);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

// If route not found
app.use(async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
