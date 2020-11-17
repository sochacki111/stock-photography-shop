import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  title: string;
  author: string;
  keywords: string[];
  url: string;
  price: number;
}

const OrderSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: 'Photo'
    },
    author: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: []
    }
    // totalPrice: { type: Number, required: true }
  },
  {
    timestamps: true // created_at / updated_at
  }
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
