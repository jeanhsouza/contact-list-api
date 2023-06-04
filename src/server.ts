import app from "./app";
import { AppDataSource } from "./data-source";

const PORT: number = parseInt(process.env.PORT!);
const runningMsg: string = `Server running on http://localhost:${PORT}`;

AppDataSource.initialize()
	.then(async () => {
		console.log("Database connected!");

		app.listen(PORT, () => {
			console.log(runningMsg);
		});
	})
	.catch((err) => console.error(err));
