import express from "express";
import {
  addBlog,
  deleteBlog,
  getPostByID,
  getPostByUserID,
  getPosts,
  updateBlog,
} from "../controller/blog.js";
import upload from "../middleware/multer.js";

const blogRouter = express.Router();

blogRouter.post("/addBlog", upload.single("image"), addBlog);
blogRouter.put("/updateBlog/:id", updateBlog);
blogRouter.delete("/deleteBlog/:id", deleteBlog);
blogRouter.get("/getPosts", getPosts);
blogRouter.get("/getPostByID/:id", getPostByID);
blogRouter.get("/getPostByUserID/:id", getPostByUserID);

export default blogRouter;
