const commentsModel = require("../models/comments");
const postModel = require("../models/posts");

const createNewComment = (req, res) => {
  const id = req.params.postId;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const newComment = new commentsModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
        postModel
        .findByIdAndUpdate(
          { _id: id },
          { $push: { comments: result._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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

const deleteCommentById=(req,res)=>{
  const postId = req.params.id;
  commentsModel
    .findByIdAndDelete({_id: postId })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Comment deleted ",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
}
module.exports = {
  createNewComment,
  deleteCommentById,

};
