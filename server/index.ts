import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();
const app = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());
app.use(cors());
app.use(helmet()); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // log the requests

app.use("/api/products", productRoutes);

app.listen(port, () => {
	console.log(`Server is running at Port ${port}`);
});
