import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
} from "./posts.controller";
import { authenticateToken } from "../../middleware/auth"; // Middleware de autenticación

const router = express.Router();

router.post("/", authenticateToken, createPost);
router.get("/", getAllPosts);
router.get("/user", authenticateToken, getPostsByUser);
router.get("/:id", getPostById);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);

export default router;
