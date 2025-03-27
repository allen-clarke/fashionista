import express from "express";
import cors from "cors";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoute.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
