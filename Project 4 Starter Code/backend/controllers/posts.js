const postModel = require("../models/posts");
const commentModel = require("../models/comments");

const createNewPost = (req, res) => {
    const { title, description ,media} = req.body;
    console.log("herrrr",req);
    
    const author = req.token.userId;
    const newPost = new postModel({
      title,
      description,
      media,
      author,
    });
  
    newPost
      .save()
      .then((post) => {
        res.status(201).json({
          success: true,
          message: `Post created`,
          post: post,
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
const getAllPosts = (req, res) => {
  postModel
    .find({})
    .populate("comments")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the posts",
        posts: [result],
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
const deletePostById = (req, res) => {
  const postId = req.params.id;
  postModel
    .deleteOne({ _id: postId })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Post deleted ",
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
const updatePostById = (req, res) => {
  const postId = req.params.id;
  const { title, description, media } = req.body;
  postModel
    .findOneAndUpdate(
      { _id: postId },
      { title: title, description: description, media: media },
      {
        new: true,
      }
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Post updated",
        article: result,
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
module.exports = { createNewPost, getAllPosts, deletePostById, updatePostById };
