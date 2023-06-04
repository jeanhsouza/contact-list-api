import "express-async-errors";
import cors from "cors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import {usersRoutes,loginRoute,  } from "./routers";
import { contactsRoutes } from "./routers/contacts.router";

const app: Application = express();
app.use(express.json());
app.use(cors())

app.use("/users", usersRoutes);
app.use("/login", loginRoute);
app.use("/contacts", contactsRoutes);


app.use(handleErrors);

export default app;