import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

export interface IPhoto extends Document {
  title: string;
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'User';
    };
    email: string;
  };
  // author: any;
  category: string;
  url: string;
  price: number;
  // owner: IUser['_id'];
}

const PhotoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    // author: { type: String, required: true },
    category: { type: String },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User'
    // }
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      email: String
    }
  },
  {
    timestamps: true // created_at / updated_at
  }
);

const Photo = mongoose.model<IPhoto>('Photo', PhotoSchema);

export default Photo;
