import mongoose, { Schema, Document } from 'mongoose';
import { IConfig } from '@common/Config';

const ConfigSchema: Schema = new Schema({
  blogName: { type: String, required: true },
  active: { type: Boolean, default: true }, // Default to active
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  theme: { type: String, default: null },
  // Define other fields here
});

export default mongoose.model<IConfig>('Config', ConfigSchema);
