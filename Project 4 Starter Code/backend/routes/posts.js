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

const { createNewComment } = require("./../controllers/comments");

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

module.exports = postsRouter;
