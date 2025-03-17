import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import admin from "../firebase.js";
import { productValidationSchema } from "../validations/productValidation.js";
import uploadProductImg from "../multer.js";

const productRouter = express.Router();

const db = getFirestore();

productRouter.post("/", uploadProductImg.single("image"), async (req, res) => {
  try {
    const { success, error, data } = productValidationSchema.safeParse(
      req.body
    );
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    if (!success) return res.status(400).json({ error: error.format() });

    const newProduct = {
      ...data,
      imageUrl: `/products/${req.file.filename}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const productRef = await db.collection("products").add(newProduct);

    res
      .status(201)
      .json({ message: "Product added successfully", id: productRef.id });
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const productsSnapshot = await db.collection("products").get();
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const { success, error, data } = productValidationSchema.safeParse(
      req.body
    );
    if (!success) return res.status(400).json({ error: error.format() });

    const { id } = req.params;

    const productRef = db.collection("products").doc(id);
    const productDoc = await productRef.get();

    if (!productDoc.exists)
      return res.status(404).json({ error: "Product not found" });

    await productRef.update(data);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productRef = db.collection("products").doc(id);
    const productDoc = await productRef.get();

    if (!productDoc.exists)
      return res.status(404).json({ error: "Product not found" });

    await productRef.delete();
    res.json({ message: "Product deleted successfully", productRef });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

export default productRouter;
