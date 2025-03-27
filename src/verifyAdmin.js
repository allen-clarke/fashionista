import admin from "./firebase.js";

const verifyAdmin = async (req, res, next) => {
  const { uid } = req.headers; // Send UID from frontend

  try {
    const adminRef = admin.firestore().collection("admins").doc(uid);
    const adminDoc = await adminRef.get();

    if (!adminDoc.exists) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default verifyAdmin;
