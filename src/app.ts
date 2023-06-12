import "express-async-errors";
import cors from "cors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { usersRoutes, loginRoute } from "./routers";
import { contactsRoutes } from "./routers/contacts.router";

const app: Application = express();
const path = require("path");
const docsPath = path.join(__dirname, ("docs"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoute);
app.use("/contacts", contactsRoutes);
app.use('/docs', express.static(docsPath));

app.get('/docs', (req, res) => {
    res.sendFile(path.join(docsPath, 'index.html'));
  });

app.use(handleErrors);

export default app;
