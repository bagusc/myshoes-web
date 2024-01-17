module.exports = (app) => {
  const product = require("../controllers/product.controller");
  const router = require("express").Router();
  const multer = require("multer");
  const admin = require("firebase-admin");
  const { uploadImage } = require("../controllers/upload.controller"); // Menambahkan import untuk uploadImage
  const storage = multer.memoryStorage();
  const axios = require("axios");
  app.set("view engine", "ejs");
  const upload = multer();

  router.get("/", async (req, res) => {
    try {
      const apiResponse = await axios.get(
        "https://restful-api-myshoes.vercel.app/api/products/"
      );
      res.render("index", {
        title: "Dashboard",
        apiData: apiResponse.data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/edit/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const apiResponse = await axios.get(
        `https://restful-api-myshoes.vercel.app/api/products//${id}`
      );
      res.render("edit", {
        title: "Edit Product",
        apiData: apiResponse.data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/edit/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body; // Ambil data yang dikirimkan dalam body request
      const apiResponse = await axios.put(
        `https://restful-api-myshoes.vercel.app/api/products//${id}`,
        updatedData
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      // Menggunakan method DELETE untuk menghapus produk
      const apiResponse = await axios.delete(
        `https://restful-api-myshoes.vercel.app/api/products//${id}`
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/add", async (req, res) => {
    try {
      res.render("add", {
        title: "Add Product",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  // Pastikan middleware uploadImage sudah diatur sebelum endpoint /add

  router.post("/add", upload.single("image"), uploadImage, product.create);

  //   router.get("/", product.findAll);
  //   router.post("/", upload.single("image"), uploadImage, product.create);
  //   router.get("/:id", product.findOne);
  //   router.put("/:id", product.update);
  //   router.delete("/:id", product.delete);

  router.get("/login", async (req, res) => {
    try {
      res.render("login", {
        title: "Login",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/login", async (req, res) => {
    res.redirect("/");
  });

  app.use("/", router);
};
