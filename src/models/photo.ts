import mongoose, { Schema, Document } from 'mongoose';

export interface IPhoto extends Document {
  title: string;
  author: string;
  keywords: string[];
  url: string;
}

const PhotoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    keywords: { type: [String] },
    url: { type: String, required: true }
  },
  {
    timestamps: true // created_at / updated_at
  }
);

const Photo = mongoose.model<IPhoto>('Photo', PhotoSchema);

export default Photo;
