import "express-async-errors";
import cors from "cors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { usersRoutes, loginRoute } from "./routers";
import { contactsRoutes } from "./routers/contacts.router";

const app: Application = express();
const path = require("path");
const docsPath = path.join(__dirname, ("docs" || ".dist/docs"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoute);
app.use("/contacts", contactsRoutes);
app.use('/docs', express.static(docsPath));

app.use(handleErrors);

export default app;
