const router = require("express").Router;
const {
     createPost,
     getAllPosts,
      getSinglePost,
     updatePost, 
     deletePost
    } = require("./post.controller");

    const {authRequired} = require("../middlewares/authRequired");

     const postRouter = router();

     postRouter.route("/").get(getAllPosts).post(authRequired, createPost);
     postRouter.route("/:postId")
     .get(getSinglePost)
     .patch(updatePost).delete(deletePost)
     module.exports = {authRequired, postRouter};