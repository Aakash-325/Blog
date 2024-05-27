import User from "../model/user.js";
import Blog from "../model/blog.js";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";

export const addBlog = async (req, res) => {
  const { title, description, user } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      console.error("No user found with ID:", user);
      return res.status(404).json({ message: "No user found with this ID" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const blog = new Blog({
      title: title,
      description: description,
      image: result.secure_url,
      user: user,
    });

    await blog.save();

    existingUser.blogs.push(blog._id);
    await existingUser.save();

    return res.status(201).json({ message: "Successfully created", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ message: "Error creating blog" });
  }
};

export const updateBlog = async (req, res) => {
  const { title, description, image } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title: title,
      description: description,
      image: image,
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating blog" });
  }
};

export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to delete blog" });
  }
};

export const getPosts = async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find();
    if (!blogs) {
      return res.status(404).json({ message: "no blog found" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to find blogs." });
  }
};

export const getPostByID = async (req, res) => {
  const blofId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blofId);
    if (!blog) {
      return res.status(404).json({ message: "no blog with this id" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unable to find blog with this id." });
  }
};

export const getPostByUserID = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "No user found with this ID." });
    }

    const blogIds = user.blogs;

    if (!blogIds || blogIds.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user." });
    }

    const blogs = await Blog.find({ _id: { $in: blogIds } });

    return res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error finding user or blogs:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
