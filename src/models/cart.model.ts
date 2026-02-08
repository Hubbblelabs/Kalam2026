import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem {
  event: mongoose.Types.ObjectId;
  price: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One active cart per user
    },
    items: [
      {
        event: {
          type: Schema.Types.ObjectId,
          ref: 'Event',
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
cartSchema.index({ user: 1 }, { unique: true });
cartSchema.index({ updatedAt: -1 });

export const Cart = mongoose.models.Cart || mongoose.model<ICart>('Cart', cartSchema);
