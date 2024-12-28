const express = require("express");
const authentication = require("../middleware/authentication");

const { createNewPost ,getAllPosts,deletePostById,updatePostById} = require("../controllers/posts");

const postsRouter = express.Router();



postsRouter.post("/createPost",authentication, createNewPost);
postsRouter.get("/getAllPosts", getAllPosts);
postsRouter.delete("/:id/delete", deletePostById);
postsRouter.put("/:id/update", updatePostById);

module.exports = postsRouter;
