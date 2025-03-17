// import path from "path";
// import { fileURLToPath } from "url";
import multer from "multer";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use("/products", express.static(path.join(__dirname, "products")));

const storage = multer.diskStorage({
  destination: "products/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
export default upload;
