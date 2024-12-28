const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, require: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;
