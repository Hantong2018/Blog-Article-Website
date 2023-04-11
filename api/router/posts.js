import express from "express";
import {
  addPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../router_handler/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/:token", addPost);
router.delete("/:id/:token", deletePost);
router.put("/:id/:token", updatePost);

export default router;
