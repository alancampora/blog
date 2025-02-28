import { Request, Response } from "express";
import Config from "../config/config.model"; // Ensure you have the correct path to your Config model
import Post from "../posts/posts.model"; // Ensure you have the correct path to your Post model

// Obtener posts de un usuario específico por blogName
export const getPostsByBlogName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogName } = req.params;

    if (!blogName) {
      res.status(400).json({ message: "El nombre del blog es obligatorio" });
      return;
    }

    // Get user ID from Config model using blogName
    const config = await Config.findOne({ blogName });

    if (!config) {
      res.status(404).json({ message: "No se encontró el usuario para el nombre del blog proporcionado" });
      return;
    }

    const userId = config.userId;

    // Get all published posts for the user
    const posts = await Post.find({ userId, published: true })
      .populate("userId", "username email");

    res.json({ posts, config });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts del usuario", error });
  }
};
