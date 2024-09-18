const express = require("express");
const {
  blogsList,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/blogsController");

const blogsRoutes = express.Router();

blogsRoutes.get("/all-blogs", blogsList);

blogsRoutes.get("/list", getAllPosts);
blogsRoutes.post("/create", createPost);
blogsRoutes.get("/list/:id", getPostById);
blogsRoutes.put("/udpate/:id", updatePost);
blogsRoutes.delete("/delete/:id", deletePost);

module.exports = blogsRoutes;
