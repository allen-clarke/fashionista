import express, { json } from "express";
import cors from "cors";

import productRouter from "./routes/productRoutes.js";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/products", productRouter);

// app.use("/products", express.static(path.join(__dirname, "products")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
