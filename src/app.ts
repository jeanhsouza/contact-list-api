import "express-async-errors";
import cors from "cors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { usersRoutes, loginRoute } from "./routers";
import { contactsRoutes } from "./routers/contacts.router";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoute);
app.use("/contacts", contactsRoutes);

const path = require("path");

app.use('/docs/logo.png', express.static(path.join(__dirname, "./docs/logo.png")));

app.get("/docs", (req, res) => {
	const filePath = path.join(__dirname, "./docs/index.html");
	res.sendFile(filePath);
});

app.get("/docs/bundle.css", (req, res) => {
	const cssFilePath = path.join(__dirname, "./docs/bundle.css");
	res.setHeader("Content-Type", "text/css");
	res.sendFile(cssFilePath);
});

app.get("/docs/bundle.js", (req, res) => {
	const jsFilePath = path.join(__dirname, "./docs/bundle.js");
	res.setHeader("Content-Type", "text/javascript");
	res.sendFile(jsFilePath);
});

app.get('/docs/insomnia.json', (req, res) => {
    const jsonFilePath = path.join(__dirname, "./docs/insomnia.json");
    res.sendFile(jsonFilePath);
  });

app.use(handleErrors);

export default app;
