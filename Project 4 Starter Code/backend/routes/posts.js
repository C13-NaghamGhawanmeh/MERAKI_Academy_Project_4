const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
  createNewPost,
  getAllPosts,
  deletePostById,
  updatePostById,
  getPostById,
} = require("../controllers/posts");

const { createNewComment ,deleteCommentById } = require("./../controllers/comments");
const { addToFavorite ,getAllFavorites ,deleteFavoritItemById} = require("../controllers/favorites");

const postsRouter = express.Router();

postsRouter.post(
  "/createPost",
  authentication,
  authorization("CREATE_POSTS"),
  createNewPost
);
postsRouter.get("/getAllPosts", authentication, getAllPosts);
postsRouter.get("/getPostById/:id", authentication, getPostById);
postsRouter.delete("/:id/delete", deletePostById);
postsRouter.put("/:id/update", updatePostById);
postsRouter.post(
  "/:postId/comments",
  authentication,
  authorization("CREATE_COMMENTS"),
  createNewComment
);
postsRouter.post(
  "/:postId/favorites",
  authentication,
  addToFavorite
);
postsRouter.get("/getAllFavorites", authentication, getAllFavorites);
postsRouter.delete("/:id/deleteFavoriteItem", authentication,deleteFavoritItemById);
postsRouter.delete("/:id/comments/delete",authentication, deleteCommentById);

module.exports = postsRouter;
