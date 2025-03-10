const postModel = require("../models/posts");
const commentModel = require("../models/comments");

const createNewPost = (req, res) => {
  const { title, description, media } = req.body;
  console.log("herrrr", req);

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
  const userId = req.token.userId;
  const userName = req.token.author;
  const role = req.token.role

  postModel
    .find({})
    .populate("comments")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the posts",
        userId: userId,
        posts: result,
        userName: userName,
        role :role,
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

const getPostById = (req, res) => {
  const postId = req.params.id;
  postModel
    .find({ _id: postId })
    .populate("author")
    .populate({ 
      path: 'comments',
      populate: { path: 'commenter' }
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "One Post",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error ggg",
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
    .populate("comments")

    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Post updated",
        post: result,
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
const getPostsBySearch = (req,res)=>{
  const postTitle = req.body.searchTitle;
  console.log("kkkkkk",postTitle);
  
  postModel
    .find({ title:new RegExp(postTitle,"i")  })
    .populate("author")
    .populate({ 
      path: 'comments',
      populate: { path: 'commenter' }
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "this Post",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error ggg",
        err: err.message,
      });
    });
}
module.exports = {
  createNewPost,
  getAllPosts,
  deletePostById,
  updatePostById,
  getPostById,
  getPostsBySearch,
};
