import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();
const app = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());
app.use(cors());
app.use(helmet()); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // log the requests

app.use("/api/products", productRoutes);

async function initDB(): Promise<void> {
	try {
		await sql`
	CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP	)
	`;
		console.log("Database Connected Successfully");
	} catch (error) {
		console.log(
			"Error initDB",
			error instanceof Error ? error.message : error
		);
	}
}

initDB().then(() => {
	app.listen(port, () => {
		console.log(`Server is running at Port ${port}`);
	});
});
