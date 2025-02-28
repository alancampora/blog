import mongoose, { Schema, Document } from 'mongoose';

export interface IConfig extends Document {
  blogName: string;
  active: boolean; // New field for active/inactive state
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
  // Add other properties as needed
}

const ConfigSchema: Schema = new Schema({
  blogName: { type: String, required: true },
  active: { type: Boolean, default: true }, // Default to active
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  // Define other fields here
});

export default mongoose.model<IConfig>('Config', ConfigSchema);
