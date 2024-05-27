import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());
dotenv.config();
app.use(cors());

app.use("/blog", blogRouter);
app.use("/user", userRouter);

mongoose
  .connect(
    "mongodb+srv://aakashchaurasiya033:c1bvvziGTHnJPfq0@cluster0.t5pwjwv.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is Started!");
    });
    console.log("Database is connected!");
  })
  .catch((err) => console.error(err));
