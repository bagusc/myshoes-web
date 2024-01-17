const dbConfig = require("../../config/db.config");
const mongoose = require("mongoose");

//promise completion dari proses asyncrounus
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.posts = require("./post.model")(mongoose);
db.products = require("./product.model")(mongoose);

module.exports = db;
