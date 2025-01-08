const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  favoriteOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  favoriteItem: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

const favoriteModel = mongoose.model("Favorite", favoriteSchema);
module.exports = favoriteModel;
