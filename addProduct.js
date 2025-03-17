// import { getFirestore } from "firebase-admin/firestore";
import { products } from "./src/products.js";
import admin from "./src/firebase.js";

const db = admin.firestore();

async function addProducts() {
  try {
    const batch = db.batch();
    products.forEach((product) => {
      const docRef = db.collection("products").doc();
      batch.set(docRef, {
        ...product,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();
    console.log("Products added successfully!");
  } catch (error) {
    console.error("Error adding products:", error);
  }
}

addProducts();
