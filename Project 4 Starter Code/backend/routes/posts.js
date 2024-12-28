const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const { createNewPost ,getAllPosts,deletePostById,updatePostById} = require("../controllers/posts");

const postsRouter = express.Router();



postsRouter.post("/createPost",authentication,authorization("CREATE_POSTS") ,createNewPost);
postsRouter.get("/getAllPosts",authentication, getAllPosts);
postsRouter.delete("/:id/delete", deletePostById);
postsRouter.put("/:id/update", updatePostById);

module.exports = postsRouter;
