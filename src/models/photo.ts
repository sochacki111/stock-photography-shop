import mongoose, { Schema, Document } from 'mongoose';

export interface PhotoInterface extends Document {
  title: string;
  author: string;
  keywords: string[];
  url: string;
}

const PhotoSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  keywords: { type: [String], required: true },
  url: { type: String, required: true }
});

const Photo = mongoose.model<PhotoInterface>('Photo', PhotoSchema);

export default Photo;
