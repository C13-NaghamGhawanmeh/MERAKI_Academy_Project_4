const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  media: { type: String, require: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
