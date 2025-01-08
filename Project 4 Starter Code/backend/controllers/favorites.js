const favoriteModel = require("../models/favorites");
const postModel = require("../models/posts");

const addToFavorite = (req, res) => {
  const id = req.params.postId;
  const favoriteItem = req.params.postId;
  const favoriteOwner = req.token.userId;
  console.log(res);
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
        role: result,
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

module.exports = {
  addToFavorite,
};
