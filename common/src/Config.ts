import mongoose, { Document } from "mongoose";

export interface IConfig extends Document {
  blogName: string;
  active: boolean; // New field for active/inactive state
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
  theme: string;
  // Add other properties as needed
}

export type Config = Omit<IConfig, "createdAt" | "updatedAt">

