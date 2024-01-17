module.exports = (app) => {
  const product = require("../controllers/product.controller");
  const router = require("express").Router();
  const multer = require("multer");
  const admin = require("firebase-admin");
  const { uploadImage } = require("../controllers/upload.controller"); // Menambahkan import untuk uploadImage

  const storage = multer.memoryStorage();

  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "./uploads/");
  //   },
  //   filename: function (req, file, cb) {
  //     const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
  //     cb(
  //       null,
  //       file.fieldname + "-" + uniqueSuffix + ".jpg" || ".png" || ".jpeg"
  //     );
  //   },
  // });

  const upload = multer({ storage: storage });

  router.get("/", product.findAll);
  router.post("/", upload.single("image"), uploadImage, product.create);
  router.get("/:id", product.findOne);
  router.put("/:id", product.update);
  router.delete("/:id", product.delete);

  app.use("/api/products", router);
};
