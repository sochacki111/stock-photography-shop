import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

export interface IPhoto extends Document {
  title: string;
  category: string;
  url: string;
  price: number;
  owner: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
  };
}

const PhotoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true // created_at / updated_at
  }
);

const Photo = mongoose.model<IPhoto>('Photo', PhotoSchema);

export default Photo;
