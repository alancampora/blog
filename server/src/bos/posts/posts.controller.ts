import { Request, Response } from "express";
import Post, { IPost } from "./posts.model";
import { IUser } from "@common/User";

// Tipo extendido para la request con usuario autenticado
interface AuthRequest extends Request {
  user?: IUser;
}

// Crear un nuevo post
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = req.user?._id; // Ahora `req.user` viene del middleware `authenticateToken`

    if (!title || !content) {
      res.status(400).json({ message: "Título y contenido son obligatorios" });
      return;
    }

    const newPost: IPost = new Post({ title, content, userId });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};

// Obtener todos los posts
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().populate("userId", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
};

// Obtener un post por ID
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

// Actualizar un post
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "Post no encontrado" });
      return;
    }

    console.log({ post, user: req.user });

    if (post.userId.toString() !== req.user?.id.toString()) {
      res.status(403).json({ message: "No tienes permiso para actualizar este post" });
      return;
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.json(post);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error al actualizar el post", error });
  }
};

// Eliminar un post
export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "Post no encontrado" });
      return;
    }

    if (post.userId.toString() !== req.user?.id) {
      res.status(403).json({ message: "No tienes permiso para eliminar este post" });
      return;
    }

    await post.deleteOne();
    res.json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post", error });
  }
};
