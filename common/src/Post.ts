import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  imageUrl?: string;
}

export type Post = Omit<IPost, "userId" | "createdAt" | "updatedAt"> & {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};