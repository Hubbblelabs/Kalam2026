import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  event: mongoose.Types.ObjectId;
  eventTitle: string;
  eventDate: Date;
  price: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  totalAmount: number;
  payment: mongoose.Types.ObjectId;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    eventTitle: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
