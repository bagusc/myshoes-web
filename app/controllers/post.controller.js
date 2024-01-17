const db = require("../models");
const Post = db.posts;

exports.findAll = (req, res) => {
  Post.find()
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
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  post
    .save(post)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured when creating data",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((result) => {
      res.status(500).send({
        message: err.message || "Some error occured when finding data",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`,
        });
      } else {
        res.send({
          message: "Post was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      } else {
        res.send({
          message: "Post was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};
