const favoriteModel = require("../models/favorites");
const postModel = require("../models/posts");

const addToFavorite = (req, res) => {
  console.log("tttttssssstttt");

  const favoriteItem = req.params.postId;
  const favoriteOwner = req.token.userId;
  // console.log(res);
  const newFavorite = new favoriteModel({
    favoriteOwner,
    favoriteItem,
  });
  newFavorite
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Item added to favorites`,
        favItem: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllFavorites = (req, res) => {
  const userId = req.token.userId;
  // const userName = req.token.author;

  favoriteModel
    .find({ favoriteOwner: userId })
    .populate({
      path: "favoriteItem",
      populate: { path: "author" },
    })
    .populate({
      path: "favoriteItem",
      populate: { path: "comments", populate: { path: "commenter" } },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the favorites",
        //   userId: userId,
        favorites: result,
        //   userName: userName,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const deleteFavoritItemById = (req, res) => {
  const favoriteItemId = req.params.id;
  favoriteModel
    .findOneAndDelete({ favoriteItem: favoriteItemId })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Item deleted ",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
module.exports = {
  addToFavorite,
  getAllFavorites,
  deleteFavoritItemById,
};
