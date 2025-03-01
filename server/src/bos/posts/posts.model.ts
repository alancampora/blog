import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "@common/Post";

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    published: { type: Boolean, default: false },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
