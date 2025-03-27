import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import admin from "../firebase.js";
import verifyAdmin from "../verifyAdmin.js";

const userRouter = express.Router();

userRouter.get("/", verifyAdmin, async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "No Name",
      photoURL: user.photoURL || "",
      createdAt: user.metadata.creationTime,
    }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
