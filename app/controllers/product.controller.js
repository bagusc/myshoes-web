const db = require("../models");
const Product = db.products;

exports.findAll = (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured when finding data",
      });
    });
};

exports.create = (req, res) => {
  const product = new Product({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    rating: req.body.rating,
    image: req.imageUrl,
  });

  product
    .save(product)
    .then((result) => {
      // res.send(result);
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured when creating data",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot find Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured when creating data",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.status(201).send({
          message: "Product was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured when creating data",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.status(201).send({
          message: "Product was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured when creating data",
      });
    });
};
