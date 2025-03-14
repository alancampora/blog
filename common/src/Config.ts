import mongoose, { Document } from "mongoose";

export interface IConfig extends Document {
  handle: string;
  active: boolean; // New field for active/inactive state
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
  theme: string;
  blogTitle: string;
  blogDescription: string;
  _id: mongoose.Schema.Types.ObjectId;
  // Add other properties as needed
}

export type Config = Omit<IConfig, "createdAt" | "updatedAt">

