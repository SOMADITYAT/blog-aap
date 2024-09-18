const blogModel = require("../models/blogsModel");

const BlogsController = {
  blogsList: async (req, res) => {
    try {
      return res.status(201).send({
        success: true,
        message: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error In Register callback",
        success: false,
        error,
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const newPost = new blogModel({ title, content });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await blogModel.find().sort({ createdAt: -1 });
      res.status(200).json({ status: "success", data: posts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await blogModel.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const updatedPost = await blogModel.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
      );
      if (!updatedPost)
        return res.status(404).json({ message: "Post not found" });
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await blogModel.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = BlogsController;
