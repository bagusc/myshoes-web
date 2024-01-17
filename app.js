const express = require("express");
const axios = require("axios");

// const cors = require("cors");

const app = express();
app.set("view engine", "ejs");

// parsing data req => json
app.use(express.json());
//req => urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("uploads", express.static("uploads"));

const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/api/products/uploads/:filename", (req, res) => {
  res.sendFile(__dirname + "/uploads/" + req.params.filename);
});

require("./app/routes/web.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/product.routes")(app);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
