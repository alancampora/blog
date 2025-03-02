import { Request, Response } from "express";
import { IPost } from "@common/Post";
import { IUser } from "@common/User";
import Post from "./posts.model";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: IUser;
}

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, published, imageUrl } = req.body;
    const userId = req.user?._id; // Ahora `req.user` viene del middleware `authenticateToken`

    if (!title || !content) {
      res.status(400).json({ message: "Título y contenido son obligatorios" });
      return;
    }

    const newPost: IPost = new Post({ title, content, userId, published, imageUrl });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().populate("userId", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate("userId", "username email");

    if (!post) {
      res.status(404).json({ message: "Post no encontrado" });
      return;
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post", error });
  }
};

export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('req.body, va a hacer el update', req.body); 
    const { title, content, published, imageUrl } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "Post no encontrado" });
      return;
    }

    console.log({ post, user: req.user });

    if (post.userId.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: "No tienes permiso para actualizar este post" });
      return;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.published = published;
    post.imageUrl = imageUrl || post.imageUrl;

    await post.save();
    res.json(post);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error al actualizar el post", error });
  }
};

export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "Post no encontrado" });
      return;
    }

    if (post.userId.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: "No tienes permiso para eliminar este post" });
      return;
    }

    await post.deleteOne();
    res.json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post", error });
  }
};

// Obtener posts de un usuario específico
export const getPostsByUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('req.user', req.user);

    const userId = req.user?._id;

    console.log('este es el userId' , { userId });

    if (!userId) {
      res.status(400).json({ message: "El ID de usuario es obligatorio" });
      return;
    }

    console.log('Querying posts with userId:', userId.toString());

    const posts = await Post.find({ userId}).populate("userId", "username email");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts del usuario", error });
  }
};
